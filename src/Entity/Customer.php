<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CustomerRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CustomerRepository::class)
 * @ApiResource(
 *          collectionOperations={"GET", "POST"},
 *          itemOperations={"GET", "PUT", "DELETE"},
 *          subresourceOperations={
 *                          "invoices_get_subresource" = {"path"="customers/{id}/invoices"}
 *          },
 *          normalizationContext={
 *                          "groups"={"customers_read"}
 *          }
 *         
 * )
 * @ApiFilter(SearchFilter::class, properties={"firstname":"ipartial", "lastname"})
 * @ApiFilter(OrderFilter::class)
 */
class Customer
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"customers_read", "invoice_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="firstname is obligator")
     * @Assert\Length(min=4, max=255, minMessage="has 4 character MIN")
     * @Groups({"customers_read", "invoice_read"})
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers_read", "invoice_read"})
     * @Assert\NotBlank(message="lastname is obligator")
     * @Assert\Length(min=4, max=255, minMessage="has 4 character MIN")
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers_read", "invoice_read"})
     * @Assert\NotBlank(message="email is obligator")
     * @Assert\Email(message="format is not valid")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers_read", "invoice_read"})
     */
    private $company;

    /**
     * @ORM\OneToMany(targetEntity=Invoice::class, mappedBy="customer")
     * @Groups({"customers_read"})
     * @ApiSubresource()
     */
    private $invoices;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="customers")
     * @Groups({"customers_read"})
     * @Assert\NotBlank(message="User Up is obligator")
     */
    private $userUp;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }

     /**
     * Undocumented function
     * @Groups({"customers_read"})
     * @return float
     */
    public function getTotalAmount(): float{
        return
                array_reduce($this->invoices->toArray(), function($total, $invoice){
                        return $total + $invoice->getAmount();
                }, 0);
    }

    /**
     * Undocumented function
     * @Groups({"customers_read"})
     * @return float
     */
    public function getUnAmount(): float{
        return
                array_reduce($this->invoices->toArray(), function($total, $invoice){
                        return $total + ($invoice->getStatus() == "PAID" || 
                                                    $invoice->getStatus() == "CANCELLED" 
                                                    ? 0  : $invoice->getAmount() );
                }, 0);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection<int, Invoice>
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->removeElement($invoice)) {
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUserUp(): ?User
    {
        return $this->userUp;
    }

    public function setUserUp(?User $userUp): self
    {
        $this->userUp = $userUp;

        return $this;
    }
}
