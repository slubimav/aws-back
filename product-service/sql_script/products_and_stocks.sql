-- public.products definition

-- Drop table

-- DROP TABLE public.products;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.products (
	id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	title text NOT NULL,
	description text NULL,
	price int4 NULL
);

-- public.stocks definition

-- Drop table

-- DROP TABLE public.stocks;

CREATE TABLE public.stocks (
	product_id uuid NULL,
	count int4 NULL
);


-- public.stocks foreign keys

ALTER TABLE public.stocks ADD CONSTRAINT stocks_fk FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

with rows as
(
INSERT INTO public.products (title, description, price)
  VALUES('High Class Humidor', 
         'Your cigar loving guy deserves the best, so help him step up his game with this stylish humidor. This humidor looks good on its own but once your aficionado fills it with his favorite cigars the beveled glass windows and high gloss cherry finish really class up your mans go to hobby. More than just a box, this quality humidor features a beautiful golden analog hygrometer and an internal humidifier to keep your guys cigars plump and ready to burn slowly for maximum enjoyment.', 
         169.99)
  returning id
)
INSERT INTO public.stocks (product_id, count) 
  values ((select id from rows), 12);

  
  with rows as
(
INSERT INTO public.products (title, description, price)
  VALUES('The Pub Mug',
  		 'Give your man a gift that will stand out on every drinking occasion. With this sand-engraved beer mug, he will be able to drink his favorite beer in a pub-style right in the comfort of his home. This unique mug will have his name engraved onto the front so it can be displayed for all to see. With this mug, it will be like he is right at the beer garden with his friends.',
  		 27.99)
  returning id
)
INSERT INTO public.stocks (product_id, count) 
  values ((select id from rows), 8);
  
  
  with rows as
(
INSERT INTO public.products (title, description, price)
  VALUES('Styling Leather Dopp',
         'What man does not like the look, feel, and smell of real leather? Give your man a token of appreciation that will stick for a long time.  The Leather Treasure Dopp Kitt comes in a light brown color that matches well with any color bag it travels with!  Personalized with up to 3 initials, this personalized dopp bag is the perfect size to fit all your travel essentials without taking up too much room.',
         54.99)
  returning id 
)
INSERT INTO public.stocks (product_id, count) 
  values ((select id from rows), 5);
  
    
  with rows as
(
INSERT INTO public.products (title, description, price)
  VALUES('Whiskey On The Rocks Set',
         'Make the perfect drink and enjoy it in style with our Whiskey Diamond Set with Square Whiskey Glass. With our set, you can enhance your overall whiskey drinking experience. These are a must-have so you can get rid of the watery, diluted taste of alcohol that most water-filled shot glasses give you. This whiskey set is all about quality - from the stunning, hand-crafted gift box to the premium-quality whiskey glasses and chilling diamond stones. Our whiskey glasses are made from high-quality crystal to create a smooth finish that provides beautiful clarity and shine. The ice diamond stones are made from top-quality basalt stones, so they last longer than other chilling stones.',
         79.99)
  returning id 
)
INSERT INTO public.stocks (product_id, count) 
  values ((select id from rows), 2);
  
      
  with rows as
(
INSERT INTO public.products (title, description, price)
  VALUES('Barrel Bar',
         'When his coveted whiskey collection calls for a top-shelf display the Barrel Bar is for him. Take his man cave or home bar from average to first-class with this handcrafted wall shelf unit. Made from the top quarter of a spent barrel he can be proud of showing off his prized bourbon collection to all of his friends and family. Makes a great gift for any whiskey loving man in your life.',
         279.99)
  returning id 
)
INSERT INTO public.stocks (product_id, count) 
  values ((select id from rows), 1);
  
        
  with rows as
(
INSERT INTO public.products (title, description, price)
  VALUES('Swing and Tap',
         'No need to hide this ashtray, this one is made to be displayed. The stogie lover in your life will be blown away by the combination of style and function with the Swing and Tap. Your guy can enjoy a smoke and then simply swing it shut to hide the unsightly ashes. Whether in the office entertaining clients or sitting on the back deck enjoying some solitude this ashtray will be appreciated by any cigar aficionados in your life. This ashtray can be easily personalized by adding your guys information into the personalization box at the top of the page. Please follow the example below.',
         39.99)
  returning id 
)
INSERT INTO public.stocks (product_id, count) 
  values ((select id from rows), 0);
  
          
  with rows as
(
INSERT INTO public.products (title, description, price)
  VALUES('Personalized Raleigh',
         'Named after the famous explorer Sir Walter Raleigh, our dependable travel holdall is the perfect companion on your next adventure. With a handy under compartment to keep shirts crisp, the Raleigh in our flagship Vintage Brown Leather is complemented with Mahogany detail. An essential unisex luggage piece for those looking for a stylish weekend bag with extra room. This personalized leather duffle bag is handmade to order and comes complete with a complimentary dust cover.',
         179.99)
  returning id 
)
INSERT INTO public.stocks (product_id, count) 
  values ((select id from rows), 7);
  
            
  with rows as
(
INSERT INTO public.products (title, description, price)
  VALUES('Puff Puff Putt',
         'Are you a cigar-loving golfer?  Well, you have just stumbled upon the most unique 3 in 1 golf tool to add to your repertoire.  No more tossing the cigar on the ground in between shots. Go ahead and fix your divot and mark your ball with the custom-designed ball marker.  And lastly, keep your cigars off the ground as this tool easily opens up for you to rest that stogie of yours on!',
         19.99)
  returning id 
)
INSERT INTO public.stocks (product_id, count) 
  values ((select id from rows), 3);
  