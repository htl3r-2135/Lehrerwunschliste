<?php

namespace App\Entity;

use App\Repository\TeacherRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: TeacherRepository::class)]
#[ORM\Table(name: 'teacher')]
#[ORM\UniqueConstraint(name: 'uniq_teacher_abbreviation', columns: ['abbreviation'])]
#[ORM\UniqueConstraint(name: 'uniq_teacher_email', columns: ['email'])]
#[UniqueEntity(fields: ['abbreviation'], message: 'Dieses Lehrerkürzel ist bereits vergeben.')]
#[UniqueEntity(fields: ['email'], message: 'Diese E-Mail-Adresse wird bereits verwendet.')]
class Teacher
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 12, unique: true)]
    #[Assert\NotBlank(message: 'Das Lehrerkürzel ist erforderlich.')]
    #[Assert\Length(max: 12)]
    #[Assert\Regex(pattern: '/^[A-Z0-9_-]+$/', message: 'Das Kürzel darf nur Großbuchstaben, Zahlen, _ und - enthalten.')]
    private string $abbreviation;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message: 'Der Vorname ist erforderlich.')]
    #[Assert\Length(max: 100)]
    private string $firstName;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message: 'Der Nachname ist erforderlich.')]
    #[Assert\Length(max: 100)]
    private string $lastName;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank(message: 'Die E-Mail-Adresse ist erforderlich.')]
    #[Assert\Email(message: 'Bitte gib eine gültige E-Mail-Adresse ein.')]
    #[Assert\Length(max: 180)]
    private string $email;

    #[ORM\Column]
    private \DateTimeImmutable $createdAt;

    public function __construct(string $abbreviation, string $firstName, string $lastName, string $email)
    {
        $this->abbreviation = strtoupper(trim($abbreviation));
        $this->firstName = trim($firstName);
        $this->lastName = trim($lastName);
        $this->email = mb_strtolower(trim($email));
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int { return $this->id; }
    public function getAbbreviation(): string { return $this->abbreviation; }
    public function getFirstName(): string { return $this->firstName; }
    public function getLastName(): string { return $this->lastName; }
    public function getEmail(): string { return $this->email; }
    public function getCreatedAt(): \DateTimeImmutable { return $this->createdAt; }
}
