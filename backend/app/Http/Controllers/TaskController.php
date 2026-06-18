<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    /**
     * Display a listing of all tasks (newest first).
     */
    public function index(): JsonResponse
    {
        $tasks = Task::orderBy('created_at', 'desc')->get();

        return response()->json($tasks);
    }

    /**
     * Store a newly created task.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status'      => ['nullable', 'in:todo,in_progress,done'],
            'due_date'    => ['nullable', 'date'],
        ]);

        $task = Task::create($validated);

        return response()->json($task, 201);
    }

    /**
     * Display a single task.
     */
    public function show(Task $task): JsonResponse
    {
        return response()->json($task);
    }

    /**
     * Update an existing task.
     */
    public function update(Request $request, Task $task): JsonResponse
    {
        $validated = $request->validate([
            'title'       => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status'      => ['nullable', 'in:todo,in_progress,done'],
            'due_date'    => ['nullable', 'date'],
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    /**
     * Remove a task.
     */
    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully.']);
    }
}