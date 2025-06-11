import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.sambal.createMany({
    data: [
      {
        name: 'Sambal Bawang',
        description: 'A simple yet flavorful sambal made from fried chili peppers and garlic, then ground into a coarse texture with abundant oil. Known for its strong spicy taste with a savory undertone, it perfectly complements fried chicken, grilled fish, or tofu and tempeh.',
        picture: 'sambal_bawang',
        alergens: 'Chili peppers, garlic'
      },
      {
        name: 'Sambal Beberuk',
        description: 'A specialty from Lombok that combines sambal with fresh vegetables like eggplant and cucumber. Made by coarsely grinding red chilies, shallots, and tomatoes mixed with sliced vegetables. It offers a refreshing medium-spicy taste, perfect with ayam taliwang or plecing kangkung.',
        picture: 'sambal_beberuk',
        alergens: 'Red chili, shallots, eggplant'
      },
      {
        name: 'Sambal Belimbing',
        description: 'A unique sambal using bilimbi (belimbing wuluh) as the main ingredient, providing a refreshing sour taste. There are two main versions: the simple NTT dipping version and the Javanese version cooked with shrimp paste. Ideal with fried fish or grilled chicken to neutralize fishy tastes.',
        picture: 'sambal_belimbing',
        alergens: 'Bilimbi, shrimp paste, chili'
      },
      {
        name: 'Sambal Ijo',
        description: 'A Padang specialty made from green chili peppers fried then ground with shallots, garlic, and green tomatoes. Its fresh green color and moderately spicy flavor make it popular, typically served with nasi padang or other fried dishes.',
        picture: 'sambal_ijo',
        alergens: 'Green chili, shallots, garlic'
      },
      {
        name: 'Sambal Jengkol',
        description: 'A Betawi specialty combining boiled jengkol (dogfruit) with salted fish. The jengkol is boiled with coffee to reduce its strong odor before mixing with spicy sambal. It offers a unique combination of savory salted fish, spicy chili, and jengkol\'s chewy texture, popular among strong-flavored food lovers.',
        picture: 'sambal_jengkol',
        alergens: 'Jengkol, salted fish, chili'
      },
      {
        name: 'Sambal Kecap',
        description: 'A simple sambal made by mixing sliced bird\'s eye chilies with sweet soy sauce, shallots, and a bit of lime juice. It has a sweet-spicy flavor with distinctive soy sauce aroma, commonly served with satay, meatballs, or tahu tek. Very popular in street food stalls.',
        picture: 'sambal_kecap',
        alergens: 'Soy sauce, bird\'s eye chili'
      },
      {
        name: 'Sambal Matah',
        description: 'A Balinese specialty where all ingredients are served raw, thinly sliced then drizzled with hot oil. Consists of chili, shallots, lemongrass, kaffir lime leaves, and shrimp paste. Very fragrant with fresh spicy taste, perfect with ayam betutu, grilled fish, or seafood.',
        picture: 'sambal_matah',
        alergens: 'Shallots, shrimp paste, chili'
      },
      {
        name: 'Sambal Pecel',
        description: 'A Javanese peanut-based sambal that\'s the main seasoning for pecel. Made from roasted peanuts ground with garlic, kencur (aromatic ginger), palm sugar, and chili. It has a savory, slightly sweet and spicy taste, typically served with boiled vegetables, tempeh, and crackers in pecel dishes.',
        picture: 'sambal_pecel',
        alergens: 'Peanuts, garlic'
      },
      {
        name: 'Sambal Pencit',
        description: 'A unique East Javanese sambal using young mango (pencit) as main ingredient. Mixed with shrimp paste sauce, fermented shrimp paste, and chili, it creates a balanced sour, sweet, and spicy taste with slightly coarse texture and crunchy young mango pieces. Goes well with fried fish or fresh vegetables.',
        picture: 'sambal_pencit',
        alergens: 'Young mango, shrimp paste sauce, fermented shrimp paste'
      },
      {
        name: 'Sambal Petis',
        description: 'An East Javanese specialty using shrimp paste sauce (petis) as main ingredient. The sauce is mixed with chili, garlic, and a little water then cooked until thickened. It has a savory taste with strong shrimp paste aroma, usually served as dipping sauce for fried tofu, tempeh, or lontong kupang.',
        picture: 'sambal_petis',
        alergens: 'Shrimp paste sauce, garlic'
      },
      {
        name: 'Sambal Saus',
        description: 'A smooth-textured sambal similar to sauce, typically made from chili blended with tomatoes and other spices then cooked until thick. There are two main types: sweet tomato sauce sambal and spicy chili sauce sambal. Perfect for hot dogs, burgers, or nuggets.',
        picture: 'sambal_saus',
        alergens: 'Chili, tomatoes, garlic'
      },
      {
        name: 'Sambal Tempoyak',
        description: 'An authentic sambal originating from Sumatra and Kalimantan, made from fermented durian (tempoyak) mixed with chilies, shallots, and spices. This traditional condiment has been part of Melayu culinary heritage in Indonesia for centuries, recognized as an Intangible Cultural Heritage by the Indonesian government. The sambal offers a unique combination of sour, spicy, and umami flavors with a distinctive durian aroma, traditionally served with grilled patin fish or as a cooking base for local dishes.',
        picture: 'sambal_tempoyak',
        alergens: 'Fermented durian, chili, fish (if served with fish)'
      },
      {
        name: 'Sambal Terasi',
        description: 'Indonesia\'s most popular sambal using fermented shrimp paste as main ingredient. The paste is roasted first then ground with chili, tomatoes, and salt. It has a spicy taste with strong shrimp paste aroma. There are many regional variations like the spicy Sundanese version or more complex Balinese version.',
        picture: 'sambal_terasi',
        alergens: 'Shrimp paste, chili, tomatoes'
      }
    ],
    skipDuplicates: true
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });