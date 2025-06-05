CREATE TABLE processes (
    process_id INT AUTO_INCREMENT PRIMARY KEY,
    process_name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO processes (process_name) VALUES
('TIG'),
('MIG'),
('Stick'),
('Spray');


CREATE TABLE materials (
    material_id INT AUTO_INCREMENT PRIMARY KEY,
    material_name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO materials (material_name) VALUES
('Mild-Steel'),
('Stainless-Steel'),
('Aluminium');


CREATE TABLE joints (
    joint_id INT AUTO_INCREMENT PRIMARY KEY,
    joint_name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO joints (joint_name) VALUES
('Tee'),
('Lap'),
('Corner'),
('Butt');

CREATE TABLE thicknesses (
    thickness_id INT AUTO_INCREMENT PRIMARY KEY,
    thickness_value DECIMAL(6,4) UNIQUE NOT NULL
);

INSERT INTO thicknesses (thickness_value) VALUES
(.0625),
(.1250),
(.2500),
(.3750);


CREATE TABLE welders (
    welder_id INT AUTO_INCREMENT PRIMARY KEY,
    welder_name VARCHAR(100) NOT NULL,
    welder_email VARCHAR(100) NOT NULL
);

INSERT INTO welders (welder_name, welder_email) VALUES
('Samuel Wubishet', 'info@weldmaster.com'),
('David Holtzman', 'dholtzman@gwinnetttech.edu'),
('Cole Norman', 'info@weldmaster.com'),
('Bailey Jurick', 'info@weldmaster.com'),
('Grant Thiel', 'info@weldmaster.com'),
('Brandon Green', 'info@weldmaster.com'),
('Mystery', 'info@weldmaster.com'),
('Draven', 'info@weldmaster.com'),
('Sadrac', 'info@weldmaster.com'),
('Chase Lancaster', 'info@weldmater.com'),
('Ahmo Ziga', 'info@weldmaster.com');



CREATE TABLE samples (

    sample_id INT AUTO_INCREMENT PRIMARY KEY,
    process_id INT NOT NULL,
    material_id INT NOT NULL,
    joint_id INT NOT NULL,
    thickness_id INT NOT NULL,
    welder_id INT NOT NULL,
    description TEXT,
    img_src VARCHAR(255) NOT NULL,
    thumb_src VARCHAR(255) NOT NULL,
    amperage VARCHAR(50),
    voltage VARCHAR(50),
    frequency VARCHAR(50),
    balance VARCHAR(50),
    duration VARCHAR(50),
    wire_feed_speed VARCHAR(50),   
    filler_diameter VARCHAR(50),   
    gas_type VARCHAR(50),          
    gas_flow_rate VARCHAR(50),     
    polarity VARCHAR(50),                            
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (process_id) REFERENCES processes(process_id),
    FOREIGN KEY (material_id) REFERENCES materials(material_id),
    FOREIGN KEY (joint_id) REFERENCES joints(joint_id),
    FOREIGN KEY (thickness_id) REFERENCES thicknesses(thickness_id),
    FOREIGN KEY (welder_id) REFERENCES welders(welder_id)

);




INSERT INTO samples (
process_id,  material_id,    joint_id,   thickness_id,   welder_id,  description, img_src                                                                        , thumb_src                                                                             , amperage, voltage, frequency, balance, duration, wire_feed_speed, filler_diameter, gas_type, gas_flow_rate, polarity) VALUES
(3        , 1           ,   1        ,   3           ,   4        ,  ''         , 'Assets/WeldHighRes/Bailey-Jurick-Stick-Mild-Steel-25-Tee.jpg'                 , 'Assets/WeldThumbnails/Bailey-Jurick-Stick-Mild-Steel-25-Tee_thumb.jpg'               , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(4        , 1           ,   3        ,   4           ,   6        ,  ''         , 'Assets/WeldHighRes/Brandon-Green-Spray-Mild-Steel-375-Corner.jpg'             , 'Assets/WeldThumbnails/Brandon-Green-Spray-Mild-Steel-375-Corner_thumb.jpg'           , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 3           ,   2        ,   1           ,   3        ,  ''         , 'Assets/WeldHighRes/Cole-Norman-TIG-Aluminium-0625-Lap.jpg'                    , 'Assets/WeldThumbnails/Cole-Norman-TIG-Aluminium-0625-Lap_thumb.jpg'                  , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 3           ,   2        ,   2           ,   3        ,  ''         , 'Assets/WeldHighRes/Cole-Norman-TIG-Aluminium-125-Lap.jpg'                     , 'Assets/WeldThumbnails/Cole-Norman-TIG-Aluminium-125-Lap_thumb.jpg'                   , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 3           ,   1        ,   2           ,   3        ,  ''         , 'Assets/WeldHighRes/Cole-Norman-TIG-Aluminium-125-Tee.jpg'                     , 'Assets/WeldThumbnails/Cole-Norman-TIG-Aluminium-125-Tee_thumb.jpg'                   , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(4        , 1           ,   2        ,   4           ,   5        ,  ''         , 'Assets/WeldHighRes/Grant-Thiel-Spray-Mild-Steel-375-Lap.jpg'                  , 'Assets/WeldThumbnails/Grant-Thiel-Spray-Mild-Steel-375-Lap_thumb.jpg'                , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(4        , 1           ,   1        ,   4           ,   5        ,  ''         , 'Assets/WeldHighRes/Grant-Thiel-Spray-Mild-Steel-375-Tee.jpg'                  , 'Assets/WeldThumbnails/Grant-Thiel-Spray-Mild-Steel-375-Tee_thumb.jpg'                , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 3           ,   3        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Aluminium-0625-Corner.jpg'             , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Aluminium-0625-Corner_thumb.jpg'           , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 3           ,   2        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Aluminium-0625-Lap.jpg'                , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Aluminium-0625-Lap_thumb.jpg'              , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 3           ,   1        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Aluminium-0625-Tee.jpg'                , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Aluminium-0625-Tee_thumb.jpg'              , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 3           ,   4        ,   2           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Aluminium-125-Butt.jpg'                , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Aluminium-125-Butt_thumb.jpg'              , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 3           ,   3        ,   2           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Aluminium-125-Corner-2.jpg'            , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Aluminium-125-Corner-2_thumb.jpg'          , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 3           ,   3        ,   2           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Aluminium-125-Corner.jpg'              , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Aluminium-125-Corner_thumb.jpg'            , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 1           ,   3        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Mild-Steel-0625-Corner-2.jpg'          , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Mild-Steel-0625-Corner-2_thumb.jpg'        , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 1           ,   3        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Mild-Steel-0625-Corner.jpg'            , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Mild-Steel-0625-Corner_thumb.jpg'          , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 1           ,   2        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Mild-Steel-0625-Lap.jpg'               , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Mild-Steel-0625-Lap_thumb.jpg'             , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 1           ,   1        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Mild-Steel-0625-Tee-2.jpg'             , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Mild-Steel-0625-Tee-2_thumb.jpg'           , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
(1        , 1           ,   1        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Mild-Steel-0625-Tee.jpg'               , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Mild-Steel-0625-Tee_thumb.jpg'             , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 1           ,   3        ,   2           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Mild-Steel-125-Corner.jpg'             , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Mild-Steel-125-Corner_thumb.jpg'           , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 1           ,   2        ,   2           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Mild-Steel-125-Lap.jpg'                , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Mild-Steel-125-Lap_thumb.jpg'              , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 1           ,   1        ,   2           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Mild-Steel-125-Tee.jpg'                , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Mild-Steel-125-Tee_thumb.jpg'              , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 2           ,   3        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Stainless-Steel-0625-Corner-2.jpg'     , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Stainless-Steel-0625-Corner-2_thumb.jpg'   , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 2           ,   3        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Stainless-Steel-0625-Corner.jpg'       , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Stainless-Steel-0625-Corner_thumb.jpg'     , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 2           ,   2        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Stainless-Steel-0625-Lap.jpg'          , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Stainless-Steel-0625-Lap_thumb.jpg'        , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 2           ,   1        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Stainless-Steel-0625-Tee.jpg'          , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Stainless-Steel-0625-Tee_thumb.jpg'        , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 2           ,   3        ,   2           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Stainless-Steel-125-Corner.jpg'        , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Stainless-Steel-125-Corner_thumb.jpg'      , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 2           ,   2        ,   2           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Stainless-Steel-125-Lap.jpg'           , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Stainless-Steel-125-Lap_thumb.jpg'         , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 2           ,   1        ,   2           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Stainless-Steel-125-Tee.jpg'           , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Stainless-Steel-125-Tee_thumb.jpg'         , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(1        , 1           ,   1        ,   2           ,   8        ,  ''         , 'Assets/WeldHighRes/Draven-TIG-Mild-Steel-125-Tee.jpg'                         , 'Assets/WeldThumbnails/Draven-TIG-Mild-Steel-125-Tee_thumb.jpg'                       , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(2        , 1           ,   1        ,   2           ,   2        ,  ''         , 'Assets/WeldHighRes/David-Holtzman-MIG-Mild-Steel-125-Tee.jpg'                 , 'Assets/WeldThumbnails/David-Holtzman-MIG-Mild-Steel-125-Tee_thumb.jpg'               , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(4        , 1           ,   3        ,   4           ,   7        ,  ''         , 'Assets/WeldHighRes/Mystery-Spray-Mild-Steel-375-Corner.jpg'                   , 'Assets/WeldThumbnails/Mystery-Spray-Mild-Steel-375-Corner_thumb.jpg'                 , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(4        , 1           ,   2        ,   4           ,   11        ,  ''        , 'Assets/WeldHighRes/Ahmo-Ziga-Spray-Mild-Steel-375-Lap.jpg'                    , 'Assets/WeldThumbnails/Ahmo-Ziga-Spray-Mild-Steel-375-Lap_thumb.jpg'                  , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(4        , 1           ,   1        ,   4           ,   7        ,  ''         , 'Assets/WeldHighRes/Mystery-Spray-Mild-Steel-375-Tee.jpg'                      , 'Assets/WeldThumbnails/Mystery-Spray-Mild-Steel-375-Tee_thumb.jpg'                    , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(3        , 1           ,   2        ,   3           ,   7        ,  ''         , 'Assets/WeldHighRes/Mystery-Stick-Mild-Steel-25-Lap.jpg'                       , 'Assets/WeldThumbnails/Mystery-Stick-Mild-Steel-25-Lap _thumb.jpg'                    , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(4        , 1           ,   2        ,   4           ,   9        ,  ''         , 'Assets/WeldHighRes/Sadrac-Spray-Mild-Steel-375-Lap.jpg'                       , 'Assets/WeldThumbnails/Sadrac-Spray-Mild-Steel-375-Lap_thumb.jpg'                     , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(2        , 1           ,   1        ,   3           ,   2        ,  ''         , 'Assets/WeldHighRes/David-Holtzman-MIG-Mild-Steel-25-Tee-2.jpg'                , 'Assets/WeldThumbnails/David-Holtzman-MIG-Mild-Steel-25-Tee-2_thumb.jpg'              , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
(2        , 1           ,   1        ,   3           ,   2        ,  ''         , 'Assets/WeldHighRes/David-Holtzman-MIG-Mild-Steel-25-Tee.jpg'                  , 'Assets/WeldThumbnails/David-Holtzman-MIG-Mild-Steel-25-Tee_thumb.jpg'                , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),
(2        , 1           ,   3        ,   3           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-MIG-Mild-Steel-25-Corner.jpg'              , 'Assets/WeldThumbnails/Samuel-Wubishet-MIG-Mild-Steel-25-Corner_thumb.jpg'            , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
(3        , 1           ,   3        ,   3           ,   1        ,  ''         , 'Assets/WeldHighRes/Chase-Lancaseter-Stick-Mild-Steel-25-Corner.jpg'           , 'Assets/WeldThumbnails/Chase-Lancaseter-Stick-Mild-Steel-25-Corner_thumb.jpg'         , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
(2        , 1           ,   3        ,   3           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-MIG-Mild-Steel-25-Corner-2.jpg'            , 'Assets/WeldThumbnails/Samuel-Wubishet-MIG-Mild-Steel-25-Corner-2_thumb.jpg'          , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
(4        , 1           ,   1        ,   3           ,   7        ,  ''         , 'Assets/WeldHighRes/Mystery-Spray-MIld-Steel-25-Tee.jpg'                       , 'Assets/WeldThumbnails/Mystery-Spray-MIld-Steel-25-Tee_thumb.jpg'                     , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
(1        , 2           ,   3        ,   2           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Stainless-Steel-125-Corner-2.jpg'      , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Stainless-Steel-125-Corner-2_thumb.jpg'    , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
(1        , 1           ,   1        ,   2           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Mild-Steel-125-Tee-2.jpg'              , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Mild-Steel-125-Tee-2_thumb.jpg'            , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
(1        , 1           ,   1        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Mild-Steel-0625-Tee-2.jpg'             , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Mild-Steel-0625-Tee-2_thumb.jpg'           , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
(1        , 1           ,   2        ,   1           ,   1        ,  ''         , 'Assets/WeldHighRes/Samuel-Wubishet-TIG-Mild-Steel-0625-Lap-2.jpg'             , 'Assets/WeldThumbnails/Samuel-Wubishet-TIG-Mild-Steel-0625-Lap-2_thumb.jpg'           , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
(2        , 1           ,   2        ,   2           ,   2        ,  ''         , 'Assets/WeldHighRes/David-Holtzman-MIG-Mild-Steel-125-Lap.jpg'                 , 'Assets/WeldThumbnails/David-Holtzman-MIG-Mild-Steel-125-Lap_thumb.jpg'               , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      ),                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
(2        , 1           ,   2        ,   3           ,   2        ,  ''         , 'Assets/WeldHighRes/David-Holtzman-MIG-Mild-Steel-25-Lap.jpg'                  , 'Assets/WeldThumbnails/David-Holtzman-MIG-Mild-Steel-25-Lap_thumb.jpg'                , ''      , ''     , ''       , ''     , ''      , ''             , ''             , ''      , ''           , ''      );                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

 
                                                                                                                                                                                                                                                                                                                                                                                                                                                             

//1   ('TIG')    ('Mild-Steel'),     ('Tee')    (.0625)  ('Samuel Wubishet')     
//2   ('MIG')    ('Stainless-Steel') ('Lap')    (.1250)  ('David Holtzman')      
//3   ('Stick')  ('Aluminium');      ('Corner') (.2500)  ('Cole Norman')         
//4   ('Spray')                      ('Butt')   (.3750)  ('Bailey Jurrick')    
//5                                                      ('Grant Thiel')
//6                                                      ('Brandon Green')
//7                                                      ('Mystery')
//8                                                      ('Draven')
//9                                                      ('Sadrac')
//10                                                     ('Chase Lancaster')
//11                                                     ('Ahmo Ziga')   

                                                        













