<?php

namespace App\Models;

use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Survey extends Model
{
    use HasFactory, SoftDeletes, HasSlug;

    protected $fillable = [
        'title',
        'user_id',
        'slug',
        'status',
        'image',
        'description',
        'expire_date'
    ];


    public function user() {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function questions()
    {
        return $this->hasMany(\App\Models\SurveyQuestion::class, 'survey_id');
    }

    public function answers()
    {
        return $this->hasMany(\App\Models\SurveyAnswer::class, 'survey_id');
    }

    public function getSlugOptions(): SlugOptions {
        return SlugOptions::create()
        ->generateSlugsFrom('title')
        ->saveSlugsTo('slug');
    }
}
