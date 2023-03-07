<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     */
    public function getAll()
    {
        return Category::all();
    }

    /**
     * Display the specified resource.
     */
    public function get(string $id)
    {
        return response()->json(Category::where('id', $id)->first(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
    {
        $categoryModel = new Category();
        $modelRules = $categoryModel->rules;
        $formInputs = json_decode($request->formData, true);
        $validator = Validator::make($formInputs, $modelRules);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "type" => "validation error",
                "errors" => $validator->errors()->all()
            ], 400);
        }
        else {

            try {
                $fileName = $request->image->getClientOriginalName();
                $request->image->move(public_path('images'), $fileName);
                $path = "\\images\\$fileName";

                $dataToSave = [
                    ...$formInputs,
                    'imagePath' => $path
                ];

                try {
                    $newCategory = Category::create($dataToSave);
                    return response()->json([
                        'status' => true,
                        'message' => 'success',
                        'category' => $newCategory,
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
        $categoryModel = new Category();
        $modelRules = $categoryModel->rules;
        $applicableRules = [];
        foreach($modelRules as $column => $rule) {
            if (array_key_exists($column, $request->toArray())) {
                $applicableRules[$column] = $rule;
            }
        }

        $validator = Validator::make($request->all(), $applicableRules);

        if ($validator->fails()) {
            return response()->json([
                "status" => false,
                "type" => "validation error",
                "errors" => $validator->errors()->all()
            ], 400);
        }
        else {
            try {
                $category = Category::where('id', $id)->first();
                $category->update($request->toArray());
                $updatedCategory = $category->refesh();

                return response()->json([
                    'status' => true,
                    'message' => 'success',
                    'category' => $updatedCategory,
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
        return response()->json(Category::destroy($id), 200);
    }
}
