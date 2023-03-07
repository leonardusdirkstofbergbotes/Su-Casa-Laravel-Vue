<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

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
        $formInputs = array_filter(json_decode($request->formData, true));

        $categoryModel = new Category();
        $modelRules = $categoryModel->editRules();
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
                $category = Category::where('id', $id)->first();
                $dataToSave = [
                    ...$formInputs
                ];

                try {
                    $fileName = $request->image->getClientOriginalName();
                    $path = "\\images\\$fileName";

                    if ($path != $category->imagePath)
                    {
                        $request->image->move(public_path('images'), $fileName);
                        $dataToSave['imagePath'] = $path;
                        File::delete(public_path($category->imagePath));
                    }
                }
                catch (\Exception $e) {
                    return response()->json([
                        'status' => true,
                        'type' => 'file storage error',
                        'error' => $e->getMessage()
                    ], 400);
                }

                $category->update($dataToSave);

                return response()->json([
                    'status' => true,
                    'message' => 'success',
                    'category' => $category
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
        // TODO: Also delete picture
        // File::delete(public_path($category->imagePath));
        return response()->json(Category::destroy($id), 200);
    }
}
