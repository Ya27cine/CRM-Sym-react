<?php
namespace App\Controller;

use App\Entity\Invoice;

class InvoiceIncrementController 
{
    public function __invoke(Invoice $data)
    {
        $data->setChrono( $data->getChrono() + 1  );
        return $data;
    }

}
?>