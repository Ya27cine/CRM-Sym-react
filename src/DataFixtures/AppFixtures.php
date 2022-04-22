<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $chrono = 1;
        // $product = new Product();
        for ($i=0; $i < 17; $i++) { 
            $customer  = new Customer();
            $customer->setFirstname($faker->firstName)
            ->setLastname($faker->lastName)
            ->setEmail($faker->email)
            ->setCompany($faker->company);
            
            $manager->persist($customer);

            for ($j=0; $j < mt_rand(3,7); $j++) { 
                $invoice = new Invoice();
                $invoice->setAmount( $faker->randomFloat(2, 250, 5000))
                ->setCustomer($customer)
                ->setSentAt( $faker->dateTimeBetween('-6 months'))
                ->setStatus( $faker->randomElement(['PAID', 'CANCELLED', 'SENT']))
                ->setChrono($chrono++);

                $manager->persist($invoice);
            }
        }
        // exe :
        $manager->flush();
    }
}
