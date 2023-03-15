<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class MealController extends Controller
{
    private $defaultSavingPath = 'images\\meals';

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     */
    public function getAll()
    {
        return Meal::all();
    }

    /**
     * Display the specified resource.
     */
    public function get(string $id)
    {
        return response()->json(Meal::where('id', $id)->first(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
    {
        $mealModel = new Meal();
        $modelRules = $mealModel->rules;
        $formInputs = json_decode($request->formData, true);
        $validator = Validator::make($formInputs, $modelRules);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "type" => "validation error",
                "errors" => $validator->errors()
            ], 400);
        }
        else {

            try {
                $fileName = $request->image->getClientOriginalName();
                $request->image->move(public_path($this->defaultSavingPath), $fileName);
                $path = "\\$this->defaultSavingPath\\$fileName";

                $dataToSave = [
                    ...$formInputs,
                    'imagePath' => $path
                ];

                try {
                    $newMeal = Meal::create($dataToSave);
                    return response()->json([
                        'status' => true,
                        'message' => 'success',
                        'meal' => $newMeal,
                    ], 200);
                }
                catch(\Exception $e) {
                    return response()->json([
                        'status' => false,
                        'type' => 'mysql error',
                        'error' => $e->getMessage()
                    ], 400);
                }
            }
            catch (\Exception $e) {
                return response()->json([
                    'status' => true,
                    'type' => 'file storage error',
                    'error' => $e->getMessage()
                ], 400);
            }
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $formInputs = array_filter(json_decode($request->formData, true));

        $mealModel = new Meal();
        $modelRules = $mealModel->editRules();
        $applicableRules = [];
        foreach($modelRules as $column => $rule) {
            if ($column == 'name') $rule = 'required|max:255|string';

            if (array_key_exists($column, $formInputs)) {
                $applicableRules[$column] = $rule;
            }
        }

        $validator = Validator::make($formInputs, $applicableRules);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "type" => "validation error",
                "errors" => $validator->errors()->all()
            ], 400);
        }
        else {
            try {
                $meal = Meal::where('id', $id)->first();
                $dataToSave = [
                    ...$formInputs
                ];

                try {
                    $fileName = $request->image->getClientOriginalName();
                    $path = "\\$this->defaultSavingPath\\$fileName";

                    if ($path != $meal->imagePath)
                    {
                        $request->image->move(public_path($this->defaultSavingPath), $fileName);
                        $dataToSave['imagePath'] = $path;
                        File::delete(public_path($meal->imagePath));
                    }
                }
                catch (\Exception $e) {
                    return response()->json([
                        'status' => true,
                        'type' => 'file storage error',
                        'error' => $e->getMessage()
                    ], 400);
                }

                $meal->update($dataToSave);

                return response()->json([
                    'status' => true,
                    'message' => 'success',
                    'meal' => $meal
                ], 200);
            }
            catch(\Exception $e) {
                return response()->json([
                    'status' => false,
                    'type' => 'mysql error',
                    'error' => $e->getMessage()
                ], 400);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $mealToDelete = Meal::find($id);
        File::delete(public_path($mealToDelete->imagePath));
        return response()->json($mealToDelete->delete(), 200);
    }
}
