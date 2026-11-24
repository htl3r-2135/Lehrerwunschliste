<?php

namespace App\Controller\Api;

use App\Entity\Teacher;
use App\Repository\TeacherRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/teachers')]
class TeacherController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(TeacherRepository $repository): JsonResponse
    {
        $teachers = $repository->findBy([], [
            'lastName' => 'ASC',
            'firstName' => 'ASC'
        ]);

        return $this->json($teachers, context: [
            'groups' => ['teacher:read']
        ]);
    }

    #[Route('', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator
    ): JsonResponse {

        $data = $request->toArray();

        $teacher = new Teacher(
            $data['abbreviation'] ?? '',
            $data['firstName'] ?? '',
            $data['lastName'] ?? '',
            $data['email'] ?? ''
        );

        $errors = $validator->validate($teacher);

        if (count($errors) > 0) {
            $messages = [];

            foreach ($errors as $error) {
                $messages[] = $error->getMessage();
            }

            return $this->json([
                'errors' => $messages
            ], 422);
        }

        $entityManager->persist($teacher);
        $entityManager->flush();

        return $this->json([
            'id' => $teacher->getId(),
            'abbreviation' => $teacher->getAbbreviation(),
            'firstName' => $teacher->getFirstName(),
            'lastName' => $teacher->getLastName(),
            'email' => $teacher->getEmail()
        ], 201);
    }
}
