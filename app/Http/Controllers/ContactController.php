<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Devuelve una colección completa de contactos en JSON
     * @return JsonResponse
     */
    public function index() {
        return response()->json(Contact::all());
    }

    /**
     * Crea y devuelve el recurso seleccionado por id
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request) {
        $contact = new Contact;

        foreach($request->all() as $field => $value) {
            $contact->{$field} = $value;
        }

        $contact->save();

        return response()->json($contact);
    }

    /**
     * Devuelve el recurso especificado por id en JSON.
     * @param Request $request
     * @return JsonResponse
     */
    public function get(Request $request) {
        $contact = Contact::findOrFail($request->id);
        return response()->json($contact);
    }

    /**
     * Actualiza y devuelve el recurso seleccionado por id
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request) {
        $contact = Contact::findOrFail($request->id);

        foreach($request->all() as $field => $value) {
            $contact->{$field} = $value;
        }

        $contact->save();

        return response()->json($contact);
    }

    /**
     * Elimina el recurso especificado por id
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request) {
        $contact = Contact::findOrFail($request->id);
        $contact->delete();
        return response()->json($contact);
    }
}
