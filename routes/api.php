<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', [\App\Http\Controllers\Auth\UserController::class,'show']);

Route::middleware(['auth:sanctum'])->group(function () {

    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });

    Route::get('/dashboard' , [\App\Http\Controllers\Survey\DashboardController::class,'index']);

    Route::post('/logout',[\App\Http\Controllers\Auth\UserController::class,'logout']);
    Route::apiResource('survey', \App\Http\Controllers\Survey\SurveyController::class);
    Route::post('/survey/{survey}/answer', [\App\Http\Controllers\Survey\AnswerController::class, 'store']);
});

Route::get('/survey-by-slug/{survey:slug}', [\App\Http\Controllers\Survey\SurveyController::class, 'showForGuest']);
