<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Requests\ApiRequest;


use App\Role;

class Roles extends ApiController
{
    /**
     * Получение списка ролей
     * @return type
     */
    function getRoles() {
        $roles = Role::all();
        return response()->json($roles, 200, [],JSON_UNESCAPED_UNICODE);
    }
    
    /**
     * Получение роли по идентификатору
     * @param Request $request
     * @return type
     */
    function getRole(Request $request) {
        
        $id = $request->role;
        $role = Role::find($id);
        
        if(!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json($role, 200, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Добавление роли
     * @param Request $request
     * @return type
     */
    function insert(ApiRequest $request) {
        
        $request->validate([
            "name" => ["string", "required", "unique:roles,name"],
            "display_name" => ["string", "required"],
            "description" => ["string", "required"],
        ]);
        
        $role = new Role();
        $role->name = $request->name;
        $role->display_name = $request->display_name;
        $role->description = $request->description;
        
        if($role->save()){
            return response()->json($role, 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Обновление роли
     * @param ApiRequest $request
     * @return type
     */
    function update(ApiRequest $request) {
        
        $request->validate([
            "name" => ["string","unique:roles,name", ],
            "display_name" => ["string"],
            "description" => ["string"],
        ]);
        
        $role = Role::find($request->role);
        
        if(!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        if($request->name) $role->name = $request->name;
        if($request->display_name) $role->display_name = $request->display_name;
        if($request->description) $role->description = $request->description;
        
        if($role->save()){
            return response()->json($role, 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("responses.dberror"), 400, [],JSON_UNESCAPED_UNICODE);
        
    }
    
    /**
     * Удаление роли
     * @param ApiRequest $request
     * @return type
     */
    function delete(ApiRequest $request) {
        
        $role = Role::find($request->role);
        
        if(!$role) {
            return response()->json(trans("responses.not_found.role"), 404, [],JSON_UNESCAPED_UNICODE);
        }
        
        if($role->delete()) {
            return response()->json(trans("responses.delete.role"), 200, [],JSON_UNESCAPED_UNICODE);
        }
        
        return response()->json(trans("deleteerror"), 400, [],JSON_UNESCAPED_UNICODE);
    }
    
}
