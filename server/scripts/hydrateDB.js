const sequelize = require('../config/database');
const Admin = require('../models/Admin');
const OrnamentItem = require('../models/OrnamentItem');
const fs = require('fs');
const path = require('path');

// Sample admin data
const sampleAdmin = {
  email: 'seedadmin@ornastore.com',
  password: 'seedpassword123',
  role: 'owner'
};

// Sample ornaments data
const sampleOrnaments = [
  {
    name: "Classic Gold Chain",
    description: "24K pure gold chain for men",
    category: "male",
    ornamentType: "chain",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_chain.jpeg'))
  },
  {
    name: "Elegant Silver Bracelet",
    description: "925 sterling silver bracelet for women",
    category: "female",
    ornamentType: "bracelet", 
    metalType: "silver",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/silver_bracelet.webp'))
  },
  {
    name: "Diamond Gold Ring",
    description: "18K gold ring with diamond for both genders",
    category: "both",
    ornamentType: "ring",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_ring.webp'))
  },
  {
    name: "Elegant Silver Bracelet",
    description: "925 sterling silver bracelet for women",
    category: "female",
    ornamentType: "bracelet", 
    metalType: "silver",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/silver_bracelet.webp'))
  },
  {
    name: "Elegant Silver Bracelet",
    description: "925 sterling silver bracelet for women",
    category: "female",
    ornamentType: "bracelet", 
    metalType: "silver",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/silver_bracelet.webp'))
  },
  {
    name: "Elegant Silver Bracelet",
    description: "925 sterling silver bracelet for women",
    category: "female",
    ornamentType: "bracelet", 
    metalType: "silver",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/silver_bracelet.webp'))
  },
  {
    name: "Elegant Silver Bracelet",
    description: "925 sterling silver bracelet for women",
    category: "female",
    ornamentType: "bracelet", 
    metalType: "silver",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/silver_bracelet.webp'))
  },
  {
    name: "Elegant Silver Bracelet",
    description: "925 sterling silver bracelet for women",
    category: "female",
    ornamentType: "bracelet", 
    metalType: "silver",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/silver_bracelet.webp'))
  },
  {
    name: "Elegant Silver Bracelet",
    description: "925 sterling silver bracelet for women",
    category: "female",
    ornamentType: "bracelet", 
    metalType: "silver",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/silver_bracelet.webp'))
  },
  {
    name: "Elegant Silver Bracelet",
    description: "925 sterling silver bracelet for women",
    category: "female",
    ornamentType: "bracelet", 
    metalType: "silver",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/silver_bracelet.webp'))
  },
  {
    name: "Elegant Silver Bracelet",
    description: "925 sterling silver bracelet for women",
    category: "female",
    ornamentType: "bracelet", 
    metalType: "silver",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/silver_bracelet.webp'))
  },
  {
    name: "Diamond Gold Ring",
    description: "18K gold ring with diamond for both genders",
    category: "both",
    ornamentType: "ring",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_ring.webp'))
  },
  {
    name: "Diamond Gold Ring",
    description: "18K gold ring with diamond for both genders",
    category: "both",
    ornamentType: "ring",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_ring.webp'))
  },
  {
    name: "Diamond Gold Ring",
    description: "18K gold ring with diamond for both genders",
    category: "both",
    ornamentType: "ring",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_ring.webp'))
  },
  {
    name: "Diamond Gold Ring",
    description: "18K gold ring with diamond for both genders",
    category: "both",
    ornamentType: "ring",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_ring.webp'))
  },
  {
    name: "Diamond Gold Ring",
    description: "18K gold ring with diamond for both genders",
    category: "both",
    ornamentType: "ring",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_ring.webp'))
  },
  {
    name: "Classic Gold Chain",
    description: "24K pure gold chain for men",
    category: "male",
    ornamentType: "chain",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_chain.jpeg'))
  },
  {
    name: "Classic Gold Chain",
    description: "24K pure gold chain for men",
    category: "male",
    ornamentType: "chain",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_chain.jpeg'))
  },
  {
    name: "Classic Gold Chain",
    description: "24K pure gold chain for men",
    category: "male",
    ornamentType: "chain",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_chain.jpeg'))
  },
  {
    name: "Classic Gold Chain",
    description: "24K pure gold chain for men",
    category: "male",
    ornamentType: "chain",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_chain.jpeg'))
  },
  {
    name: "Classic Gold Chain",
    description: "24K pure gold chain for men",
    category: "male",
    ornamentType: "chain",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_chain.jpeg'))
  },
  {
    name: "Classic Gold Chain",
    description: "24K pure gold chain for men",
    category: "male",
    ornamentType: "chain",
    metalType: "gold",
    image: fs.readFileSync(path.join(__dirname, '../sample_images/gold_chain.jpeg'))
  }
];

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');

    // Create test admin
    const admin = await Admin.create(sampleAdmin);
    console.log('Test admin created:', admin.email);

    // Create ornaments with admin association
    for (const ornament of sampleOrnaments) {
      ornament.adminId = admin.id;
      await OrnamentItem.create(ornament);
    }
    console.log(`Successfully seeded ${sampleOrnaments.length} ornaments`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
