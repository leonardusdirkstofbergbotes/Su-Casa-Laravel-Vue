<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
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
        $validator = Validator::make($request->all(), $modelRules);

        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()->all()], 400);
        }
        else {
            try {
                $newCategory = Category::create($request->toArray());
                return response()->json($newCategory, 200);
            }
            catch(\Exception $e) {
                return response()->json(['message' => $e->getMessage()], 400);
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
            return response()->json(["message" => $validator->errors()->all()], 400);
        }
        else {
            try {
                $affectedRows = Category::where('id', $id)->update($request->toArray());

                if ($affectedRows > 0) {
                    return response()->json(["message" => 'update successfull'], 200);
                }
                else {
                    return response()->json(["message" => 'could not perform update'], 400);
                }
            }
            catch(\Exception $e) {
                return response()->json(['message' => $e->getMessage()], 400);
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