<?php

namespace App\Http\Controllers\Survey;

use App\Http\Controllers\Controller;
use App\Http\Resources\Survey\SurveyAnswerResource;
use App\Http\Resources\Survey\SurveyResourceDashboard;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        //Total Numbers of Surveys
        $total = $user->surveys->count();

        //Latest Survey
        $latest = Survey::all()->last();

        //Total Number of answers
        $totalAnswers = SurveyAnswer::query()
                        ->join('surveys', 'survey_answers.survey_id','=', 'surveys.id')
                        ->where('surveys.user_id', $user->id)->count();
        //Latest 5 Survey
        $latestAnswers = SurveyAnswer::query()
                        ->join('surveys', 'survey_answers.id','=','surveys.id')
                        ->where('surveys.user_id', $user->id)
                        ->orderBy('end_date', 'DESC')
                        ->limit(5)
                        ->getModels('survey_answers.*');
        return [
            'totalSurveys' => $total,
            'latestSurvey' => $latest ? new SurveyResourceDashboard($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswers)
        ];
    }
}
