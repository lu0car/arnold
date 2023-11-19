<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Service;

use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();
        return Inertia::render('Services/Index', ['services' => $services]);
    }

    public function create()
    {
        return Inertia::render('Services/Create');
    }

    public function store(Request $request)
    {
        $request-> validate([
            'name' => 'required|max:50',
            'cost' => 'numeric|min:0',
        ]);
        $service = new Service($request->input());
        $service->save();
        // return redirect('cars');

        return redirect()->route('services.index')
            ->with("message", "The service {$service->name} was created successfull");
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        return Inertia::render('Services/Show', ['service' => $service]);
    }

    public function update(Request $request, $id)
    {
        $service = Service::find($id);
        $service->fill($request->input())->saveOrFail();
        return redirect('services')
            ->with("message", "The service {$service->name} was updated successfull");

        // return redirect()->route('services.index');
    }

    public function destroy($id)
    {
        $service = Service::find($id);
        $service->delete();
        return redirect('services')
            ->with("message", "The service {$service->name} was deleted succesfull");

        // return redirect()->route('services.index');
    }
}
