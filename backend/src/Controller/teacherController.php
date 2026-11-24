<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/teacher')]
class TeacherController extends AbstractController {
    #[Route('/', methods: ['POST'])]
    public function createTeacher(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $teacher = [
            'abbreviation' => $data['abbreviation'] ?? null,
            'firstName' => $data['firstName'] ?? null,
            'lastName' => $data['lastName'] ?? null,
            'email' => $data['email'] ?? null,
        ];

        return $this->json([
            'teacher' => $teacher,
            'message' => 'Lehrer wurde erstellt',
        ], 201);
    }
}