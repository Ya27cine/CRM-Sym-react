<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    protected $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager ): void
    {
        $faker = Factory::create('fr_FR');
        $chrono = 1;

         // create Users
        $user = new User();
        $user->setEmail("test@prostam.fr")
            ->setLastname("Khelifa")
            ->setFirstname("Yassine")
            ->setPassword( $this->encoder->encodePassword($user,  'password' ));

        $manager->persist($user);
    
        // create customers
        for ($i=0; $i < 27; $i++) { 
            $customer  = new Customer();
            $customer->setFirstname($faker->firstName)
            ->setLastname($faker->lastName)
            ->setEmail($faker->email)
            ->setUserUp($user)
            ->setCompany($faker->company);
            
            $manager->persist($customer);
            // create Invoices
            for ($j=0; $j < 7; $j++) { 
                $invoice = new Invoice();
                $invoice->setAmount( $faker->randomFloat(2, 250, 5000))
                ->setCustomer($customer)
                ->setSentAt( $faker->dateTimeBetween('-6 months'))
                ->setStatus( $faker->randomElement(['PAID', 'CANCELLED', 'SENT']))
                ->setChrono($chrono++);

                $manager->persist($invoice);
            }// invoice

        }// customer


        // run :
        $manager->flush();
    }
}
