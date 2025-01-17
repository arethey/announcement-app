<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Announcement;

class AnnouncementController extends Controller
{
    public function index()
    {
        return response()->json(Announcement::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $announcement = Announcement::create($request->all());
        $this->updateActiveStatus($announcement);

        return response()->json(['message' => 'Announcement created successfully!', 'data' => $announcement], 201);
    }

    public function show($id)
    {
        $announcement = Announcement::findOrFail($id);
        return response()->json($announcement);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'string|max:255',
            'content' => 'string',
            'start_date' => 'date',
            'end_date' => 'date|after_or_equal:start_date',
        ]);

        $announcement = Announcement::findOrFail($id);
        $announcement->update($request->all());
        $this->updateActiveStatus($announcement);

        return response()->json(['message' => 'Announcement updated successfully!', 'data' => $announcement]);
    }

    public function destroy($id)
    {
        $announcement = Announcement::findOrFail($id);
        $announcement->delete();

        return response()->json(['message' => 'Announcement deleted successfully!']);
    }

    private function updateActiveStatus($announcement)
    {
        $now = now()->toDateString();
        $announcement->update([
            'active' => $announcement->start_date <= $now && $announcement->end_date >= $now,
        ]);
    }

    public function active()
    {
        return Announcement::where('active', true)
            ->orderBy('start_date', 'desc')
            ->get();
    }
}
