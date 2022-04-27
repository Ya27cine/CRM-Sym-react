<?php

namespace App\Entity;

use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\InvoiceRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 *    attributes={
 *                  "pagination_enabled":true,
 *                  "order"={"sentAt":"DESC"}
 *    },
 *    subresourceOperations={
 *              "api_customers_invoices_get_subresource" = { 
 *                              "normalization_context" = { 
 *                                                   "groups" = { "invoices_subresource"}
 *                                }
 *              }
 *    },
 *    itemOperations={
 *            "GET", "DELETE", "PUT",
 *              "Increment"={
 *                                  "method"="POST",
 *                                  "path"="/invoices/{id}/increment",
 *                                  "controller"="App\Controller\InvoiceIncrementController"
 *              }  
 *    },
 *    normalizationContext={"groups"={"invoice_read"}},
 *    denormalizationContext={"disable_type_enforcement"="true"}
 * )
 * @ApiFilter(OrderFilter::class, properties={"amount", "sentAt"})
 */
class Invoice
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"invoice_read", "customers_read", "invoices_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoice_read", "customers_read", "invoices_subresource"})
     * @Assert\NotBlank(message="Amount is obligator")
     * @Assert\Type(type="numeric", message="should be of type numeric")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoice_read", "customers_read",  "invoices_subresource"})
     * @Assert\NotBlank(message="Sent_At  is obligator")
     * @Assert\DateTime("format YYYY-MM-DD")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoice_read", "customers_read",  "invoices_subresource"})
     * @Assert\NotBlank(message="Status is obligator")
     * @Assert\Choice(choices={"PAID", "CANCELLED", "SENT"}, message="should be PAID, CANCELLED or SENT")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoice_read"})
     * @Assert\NotBlank(message="Customer is obligator")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoice_read", "customers_read",  "invoices_subresource"})
     * @Assert\NotBlank(message="Chrono is obligator")
     * @Assert\Type(type="numeric", message="should be numeric")
     */
    private $chrono;

    /**
     * Undocumented function
     * @Groups({"invoice_read",  "invoices_subresource"})
     * @return User
     */
    public function getUser(): User{
        return $this->customer->getUserUp();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
