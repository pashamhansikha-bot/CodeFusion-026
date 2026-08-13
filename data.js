/* ============ Ruchulu Junction — Menu Data ============ */
/* Category emojis are kept as small nav icons — they aren't food-item photos. */
const CATEGORIES = [
  {id:'combos', name:'Meal Combos', em:'🍱'},
  {id:'biryani', name:'Biryani & Rice', em:'🍛'},
  {id:'starters', name:'Starters', em:'🍢'},
  {id:'curries', name:'Curries & Gravies', em:'🍲'},
  {id:'tiffins', name:'Tiffins', em:'🥞'},
  {id:'drinks', name:'Drinks', em:'🥤'},
  {id:'sweets', name:'Sweets', em:'🍯'},
];

/* Each item:
   id, cat, name, teluguName, desc, price (INR), imgQuery, tags:['veg','spicy','bestseller'],
   optionGroups: [{ label, type:'single'|'multi', options:[{name, delta}] }]  (optional)

   imgQuery is a short English search term used to fetch a real photo for the dish
   (see js/images.js). No emoji is stored on menu items anymore. */
const MENU = [
  // ---------------- Meal Combos ----------------
  {id:'co1', cat:'combos', name:'Andhra Veg Thali', teluguName:'ఆంధ్రా వెజ్ థాలి', desc:'Steamed rice, sambar, two curries, pickle, curd, and papad — a full vegetarian meal.', price:220, imgQuery:'indian thali', tags:['veg']},
  {id:'co2', cat:'combos', name:'Chicken Curry Meal Box', teluguName:'కోడి కూర భోజనం', desc:'Rice, natu kodi curry, dal, pickle, and curd, packed for the road.', price:280, imgQuery:'chicken curry rice', tags:['bestseller']},
  {id:'co3', cat:'combos', name:'Chicken Biryani Combo', teluguName:'బిర్యానీ కాంబో', desc:'Chicken dum biryani with raita, boiled egg, and mirchi ka salan.', price:260, imgQuery:'chicken biryani', tags:['bestseller'],
    optionGroups:[
      {label:'Spice Level', type:'single', options:[{name:'Mild',delta:0},{name:'Medium',delta:0},{name:'Andhra Spicy',delta:0}]}
    ]},
  {id:'co4', cat:'combos', name:'Guntur Chicken 65 Meal Box', teluguName:'గుంటూరు చికెన్ 65 బాక్స్', desc:'Chicken 65, jeera rice, and a side salad, Guntur-style hot.', price:240, imgQuery:'chicken 65', tags:['spicy']},

  // ---------------- Biryani & Rice ----------------
  {id:'b1', cat:'biryani', name:'Hyderabadi Chicken Dum Biryani', teluguName:'హైదరాబాదీ చికెన్ దమ్ బిర్యానీ', desc:'Slow-cooked on dum with long-grain rice, fried onions, and mint.', price:240, imgQuery:'hyderabadi chicken biryani', tags:['bestseller'],
    optionGroups:[
      {label:'Portion', type:'single', options:[{name:'Half',delta:0},{name:'Full',delta:110}]},
      {label:'Spice Level', type:'single', options:[{name:'Mild',delta:0},{name:'Medium',delta:0},{name:'Andhra Spicy',delta:0}]},
      {label:'Add-ons', type:'multi', options:[{name:'Boiled Egg',delta:20},{name:'Raita',delta:25},{name:'Mirchi ka Salan',delta:30}]}
    ]},
  {id:'b2', cat:'biryani', name:'Andhra Mutton Biryani', teluguName:'ఆంధ్రా మటన్ బిర్యానీ', desc:'Bone-in mutton, single-pot masala biryani, extra spicy by tradition.', price:320, imgQuery:'mutton biryani', tags:['spicy'],
    optionGroups:[
      {label:'Portion', type:'single', options:[{name:'Half',delta:0},{name:'Full',delta:140}]},
      {label:'Add-ons', type:'multi', options:[{name:'Boiled Egg',delta:20},{name:'Raita',delta:25}]}
    ]},
  {id:'b3', cat:'biryani', name:'Veg Dum Biryani', teluguName:'వెజ్ దమ్ బిర్యానీ', desc:'Mixed vegetables and paneer, layered and dum-cooked with saffron rice.', price:190, imgQuery:'vegetable biryani', tags:['veg'],
    optionGroups:[{label:'Portion', type:'single', options:[{name:'Half',delta:0},{name:'Full',delta:90}]}]},
  {id:'b4', cat:'biryani', name:'Egg Biryani', teluguName:'కోడిగుడ్డు బిర్యానీ', desc:'Fragrant rice tossed with masala-fried boiled eggs.', price:170, imgQuery:'egg biryani', tags:[]},
  {id:'b5', cat:'biryani', name:'Pulihora', teluguName:'పులిహోర', desc:'Tamarind rice tempered with peanuts, curry leaves, and mustard seeds.', price:90, imgQuery:'tamarind rice', tags:['veg']},
  {id:'b6', cat:'biryani', name:'Curd Rice', teluguName:'పెరుగన్నం', desc:'Cooling curd rice with a tadka of curry leaves and pomegranate.', price:80, imgQuery:'curd rice', tags:['veg']},

  // ---------------- Starters ----------------
  {id:'s1', cat:'starters', name:'Guntur Chicken 65', teluguName:'గుంటూరు చికెన్ 65', desc:'Deep-fried chicken tossed in Guntur red chilli and curry leaf masala.', price:210, imgQuery:'chicken 65', tags:['spicy','bestseller'],
    optionGroups:[{label:'Spice Level', type:'single', options:[{name:'Medium',delta:0},{name:'Andhra Spicy',delta:0}]}]},
  {id:'s2', cat:'starters', name:'Gongura Chicken (Boneless)', teluguName:'గోంగూర చికెన్', desc:'Boneless chicken cooked with tangy sorrel-leaf (gongura) masala.', price:250, imgQuery:'chicken curry', tags:['spicy']},
  {id:'s3', cat:'starters', name:'Kodi Vepudu', teluguName:'కోడి వేపుడు', desc:'Andhra-style dry chicken fry with roasted spices and curry leaves.', price:230, imgQuery:'chicken fry', tags:['spicy']},
  {id:'s4', cat:'starters', name:'Chilli Garlic Prawns', teluguName:'రొయ్యల వేపుడు', desc:'Prawns tossed in a fiery garlic-chilli coastal masala.', price:280, imgQuery:'prawns fry', tags:['spicy']},
  {id:'s5', cat:'starters', name:'Mirchi Bajji', teluguName:'మిర్చి బజ్జి', desc:'Long green chillies stuffed and fried in gram-flour batter.', price:80, imgQuery:'chilli fritters', tags:['veg','spicy']},
  {id:'s6', cat:'starters', name:'Punugulu', teluguName:'పునుగులు', desc:'Bite-sized fritters made from fermented dosa batter, deep fried golden.', price:70, imgQuery:'lentil fritters', tags:['veg']},

  // ---------------- Curries & Gravies ----------------
  {id:'k1', cat:'curries', name:'Gutti Vankaya Kura', teluguName:'గుత్తి వంకాయ కూర', desc:'Baby brinjals stuffed with roasted peanut-sesame masala, slow simmered.', price:160, imgQuery:'stuffed eggplant curry', tags:['veg']},
  {id:'k2', cat:'curries', name:'Gongura Mutton', teluguName:'గోంగూర మటన్', desc:'Tender mutton simmered in tangy sorrel-leaf curry, an Andhra classic.', price:300, imgQuery:'mutton curry', tags:['spicy']},
  {id:'k3', cat:'curries', name:'Natu Kodi Pulusu', teluguName:'నాటు కోడి పులుసు', desc:'Country chicken slow-cooked in a tangy tamarind-based gravy.', price:260, imgQuery:'chicken curry', tags:['spicy']},
  {id:'k4', cat:'curries', name:'Pappu Charu', teluguName:'పప్పు చారు', desc:'Andhra-style tamarind dal curry, tempered with garlic and red chilli.', price:110, imgQuery:'dal curry', tags:['veg']},
  {id:'k5', cat:'curries', name:'Bendakaya Vepudu', teluguName:'బెండకాయ వేపుడు', desc:'Okra stir-fried with onions and Andhra spice powder.', price:130, imgQuery:'okra fry', tags:['veg']},

  // ---------------- Tiffins ----------------
  {id:'t1', cat:'tiffins', name:'Pesarattu with Upma', teluguName:'పెసరట్టు', desc:'Green-gram dosa served with soft ginger upma on the side.', price:90, imgQuery:'moong dal dosa', tags:['veg']},
  {id:'t2', cat:'tiffins', name:'Ulli Garelu', teluguName:'ఉల్లి గారెలు', desc:'Crisp lentil vadas loaded with onions and green chilli, served with sambar.', price:70, imgQuery:'vada', tags:['veg']},
  {id:'t3', cat:'tiffins', name:'Idli Sambar (4 pc)', teluguName:'ఇడ్లీ సాంబార్', desc:'Steamed rice cakes with sambar and coconut chutney.', price:70, imgQuery:'idli sambar', tags:['veg']},
  {id:'t4', cat:'tiffins', name:'Dosa', teluguName:'దోశ', desc:'Crisp rice-and-lentil crepe, served with chutney and sambar.', price:90, imgQuery:'masala dosa', tags:['veg'],
    optionGroups:[{label:'Type', type:'single', options:[{name:'Plain',delta:0},{name:'Onion',delta:15},{name:'Masala',delta:25}]}]},

  // ---------------- Drinks ----------------
  {id:'d1', cat:'drinks', name:'Majjiga', teluguName:'మజ్జిగ', desc:'Spiced buttermilk with curry leaves, ginger, and green chilli.', price:40, imgQuery:'buttermilk drink', tags:['veg']},
  {id:'d2', cat:'drinks', name:'Nannari Sarbath', teluguName:'నన్నారి సర్బత్', desc:'Cooling root-syrup sherbet, an Andhra summer staple.', price:60, imgQuery:'sarbath drink', tags:['veg']},
  {id:'d3', cat:'drinks', name:'Filter Coffee', teluguName:'ఫిల్టర్ కాఫీ', desc:'Strong South Indian decoction coffee with frothed milk.', price:50, imgQuery:'south indian filter coffee', tags:['veg']},
  {id:'d4', cat:'drinks', name:'Tender Coconut Water', teluguName:'కొబ్బరి బొండం', desc:'Fresh and naturally sweet, served chilled.', price:70, imgQuery:'tender coconut water', tags:['veg']},
  {id:'d5', cat:'drinks', name:'Fresh Lime Soda', teluguName:'నిమ్మకాయ సోడా', desc:'Sweet, salted, or mixed — a fizzy citrus refresher.', price:50, imgQuery:'lime soda', tags:['veg'],
    optionGroups:[{label:'Style', type:'single', options:[{name:'Sweet',delta:0},{name:'Salted',delta:0},{name:'Mixed',delta:0}]}]},

  // ---------------- Sweets ----------------
  {id:'w1', cat:'sweets', name:'Bobbatlu', teluguName:'బొబ్బట్లు', desc:'Sweet flatbread stuffed with jaggery and chana dal filling, ghee-roasted.', price:90, imgQuery:'puran poli', tags:['veg']},
  {id:'w2', cat:'sweets', name:'Double Ka Meetha', teluguName:'డబుల్ కా మీఠా', desc:'Fried bread soaked in sweetened milk, garnished with nuts.', price:100, imgQuery:'bread pudding dessert', tags:['veg']},
  {id:'w3', cat:'sweets', name:'Pootharekulu', teluguName:'పూతరేకులు', desc:'Paper-thin rice sheets layered with ghee and sugar, an Atreyapuram specialty.', price:120, imgQuery:'indian sweet rice paper', tags:['veg']},
  {id:'w4', cat:'sweets', name:'Kova Kajjikayalu (2 pc)', teluguName:'కోవా కజ్జికాయలు', desc:'Crescent-shaped pastries stuffed with sweet khoya and dry fruits.', price:90, imgQuery:'gujiya sweet', tags:['veg']},
];
