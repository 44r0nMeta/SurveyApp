<?php

namespace App\Http\Controllers\Survey;

use App\Models\Survey;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\Survey\SurveyResource;
use App\Models\SurveyQuestion;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return SurveyResource::collection($user->surveys()->paginate(6));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
           $relativePath = $this->saveImage($data['image']);
           $data['image'] = $relativePath;
        }

        $survey = Survey::create($data);

        //Create new questions
        foreach ($data['questions'] as $question) {

            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }

        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();

        if ($user->id !== $survey->user->id) {
            return abort(403 , 'Unauthorized action');
        }

        return new SurveyResource($survey);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function showForGuest(Survey $survey)
    {
        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        //Verifie si on a upload une image
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            if ($survey->image) {
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
        }

        $survey->update($data);


        //Recuperation des ids des questions existants
        $existingIds = $survey->questions()->pluck('id')->toArray();

        //Recuperation des ids des new questions
        $newIds = Arr::pluck($data['questions'], 'id');

        //Recuperation des ids des question a supprimer
        $toDelete = array_diff($existingIds, $newIds);

        //Recuperation des ids des question a ajouter
        $toAdd = array_diff($newIds, $existingIds);

        //suppresion des questions a effacer
        SurveyQuestion::destroy($toDelete);
        //Creation de nouvelles questions
        foreach ($data['questions'] as $question) {
            if(in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }

        //Update des questions existantes
        $questionMap = collect($data['questions'])->keyBy('id');
        foreach ($survey->questions as $question) {
            if (isset($questionMap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }


        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey, Request $request )
    {
        $user = $request->user();

        if ($user->id !== $survey->user->id) {
            return abort(403 , 'Unauthorized action');
        }

        $survey->delete();

        return response(status:204);
    }

    private  function saveImage($image)
    {
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {

            $image = substr($image, strpos($image, ',') + 1);

            $type = strtolower($type[1]); //Get file extension

            if (!in_array($type, ['jpg','jpeg','gif','png'])) {
                throw new \Exception('invalid image type');
            }

            $image = str_replace(' ','+', $image);

            $image = base64_decode($image);

            if ($image === false ) {
                throw new \Exception('base64_decode failed');

            }

        }else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random().'.'.$type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file ;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }

        file_put_contents($relativePath, $image);

        return $relativePath;
    }

    private function createQuestion($question) {

        if (is_array($question['data'])) {
            $question['data'] = json_encode($question['data']);
        }

        $validator = Validator::make($question,[
            'question' => ['required', 'string'],
            'type' => ['required', Rule::in([
                SurveyQuestion::TYPE_CHECKBOX,
                SurveyQuestion::TYPE_SELECT,
                SurveyQuestion::TYPE_RADIO,
                SurveyQuestion::TYPE_TEXTAREA,
                SurveyQuestion::TYPE_TEXT,
            ])],

            'description' => ['nullable', 'string'],
            'data' => ['present'],
            'survey_id' => ['exists:App\Models\Survey,id']
        ]);

        return SurveyQuestion::create($validator->validated());
    }

    private function updateQuestion(SurveyQuestion $question, $data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }

        $validator = Validator::make($data,[
            'id' => ['exists:App\Models\SurveyQuestion,id'],
            'question' => ['required', 'string'],
            'type' => ['required', Rule::in([
                SurveyQuestion::TYPE_CHECKBOX,
                SurveyQuestion::TYPE_SELECT,
                SurveyQuestion::TYPE_RADIO,
                SurveyQuestion::TYPE_TEXTAREA,
                SurveyQuestion::TYPE_TEXT,
            ])],

            'description' => ['nullable', 'string'],
            'data' => ['present'],
            'survey_id' => ['exists:App\Models\Survey,id']
        ]);

        return $question->update($validator->validated());
    }
}
