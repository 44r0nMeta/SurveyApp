<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    use HasFactory;

    const TYPE_TEXT = 'text';
    const TYPE_TEXTAREA = 'textarea';
    const TYPE_RADIO = 'radio';
    const TYPE_CHECKBOX = 'checkbox';
    const TYPE_SELECT = 'select';

    protected $fillable = [
        'question',
        'type',
        'description',
        'data',
        'survey_id',
    ];

    public function survey(){
        return $this->belongsTo(\App\Models\Survey::class);
    }

}
