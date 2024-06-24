<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
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

    public function services()
    {
        $services = Service::all();
        return Inertia::render('Services/Services-View', ['services' => $services]);
    }

    public function store(Request $request)
    {
        // dd($request);

        $request->validate([
            'name'=> 'required|string',
            'description' => 'required|string|max:255',
            'parts' => 'required|numeric',
            'labor' => 'required|numeric',
            'total' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'description', 'parts', 'labor', 'total']);

        
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('services', 'public');
            $data['image'] = $imagePath;
        }

        $service = Service::create($data);

        return redirect()->back()->with('message', "The service {$service->description} was created successfully");

    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        return Inertia::render('Services/Show', ['service' => $service]);
    }

    public function update(Request $request, $id)
    {

        dd($request->all());

        $service = Service::findOrFail($id);

        $request->validate([
            'description' => 'required|string',
            'parts' => 'required|numeric',
            'labor' => 'required|numeric',
            'total' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['description', 'parts', 'labor', 'total']);

        if ($request->hasFile('image')) {
            // Eliminar la imagen anterior si existe
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }
            
            // Guardar la nueva imagen
            $imagePath = $request->file('image')->store('services', 'public');
            $data['image'] = $imagePath;
        }

        $service->fill($data)->saveOrFail();

        return redirect('services')
            ->with("message", "The service {$service->description} was updated successfully");
    }
    public function destroy($id)
    {
        $service = Service::findOrFail($id);

        try {
            // Eliminar la imagen asociada si existe
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }

            // Eliminar el servicio
            $service->delete();

            return redirect()->route('services.index')
                ->with("message", "The service '{$service->description}' was deleted successfully");
        } catch (\Exception $e) {
            // Log the error
            \Log::error("Error deleting service: " . $e->getMessage());

            return redirect()->route('services.index')
                ->with("error", "There was an error deleting the service. Please try again.");
        }
    }
}
