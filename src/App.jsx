import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ─── RAW GEDCOM DATA ──────────────────────────────────────────────────────────
const SEED_DATA = JSON.parse("{\"i\":{\"I212743630971\":{\"id\":\"I212743630971\",\"name\":\"James Evans\",\"sex\":\"M\",\"b\":\"1852\",\"bp\":\"Morgan County\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F59\"],\"fams\":[]},\"I212743699138\":{\"id\":\"I212743699138\",\"name\":\"Elizabeth Seymour\",\"sex\":\"F\",\"b\":\"25 D\",\"bp\":\"Person County\",\"d\":\"05 J\",\"dp\":\"Morgan County\",\"famc\":[\"F76\"],\"fams\":[]},\"I212735163692\":{\"id\":\"I212735163692\",\"name\":\"May Alta Evans\",\"sex\":\"F\",\"b\":\"Apr \",\"bp\":\"Macoupin County\",\"d\":\"4 Ju\",\"dp\":\"Marysville\",\"famc\":[\"F18\"],\"fams\":[]},\"I212741723644\":{\"id\":\"I212741723644\",\"name\":\"Odil Cyrille Holvoet\",\"sex\":\"M\",\"b\":\"1884\",\"bp\":\"Kortrijk, Belgium\",\"d\":\"1942\",\"dp\":\"Hotchkiss, Colorado\",\"famc\":[\"F46\"],\"fams\":[\"F61\"]},\"I212743699165\":{\"id\":\"I212743699165\",\"name\":\"Robert Seymour\",\"sex\":\"M\",\"b\":\"03 M\",\"bp\":\"Person County\",\"d\":\"20 J\",\"dp\":\"Franklin\",\"famc\":[\"F76\"],\"fams\":[]},\"I212730914875\":{\"id\":\"I212730914875\",\"name\":\"Mary S. Berry\",\"sex\":\"F\",\"b\":\"abt \",\"bp\":\"Whitechapel\",\"d\":\"\",\"dp\":\"before 1890\",\"famc\":[],\"fams\":[\"F9\"]},\"I212743616304\":{\"id\":\"I212743616304\",\"name\":\"Jacob Swisher\",\"sex\":\"M\",\"b\":\"14 D\",\"bp\":\"Winfield\",\"d\":\"28 j\",\"dp\":\"Marion County\",\"famc\":[\"F60\"],\"fams\":[]},\"I212743712887\":{\"id\":\"I212743712887\",\"name\":\"Nicholas \\\"The Quaker\\\" Stone\",\"sex\":\"M\",\"b\":\"1703\",\"bp\":\"Caroline County\",\"d\":\"1778\",\"dp\":\"Anson County\",\"famc\":[\"F79\"],\"fams\":[]},\"I212743706169\":{\"id\":\"I212743706169\",\"name\":\"John J. Nosal\",\"sex\":\"M\",\"b\":\"1870\",\"bp\":\"Poland/Austria\",\"d\":\"1935\",\"dp\":\"Loup City\",\"famc\":[\"F87\"],\"fams\":[\"F63\"]},\"I212743623300\":{\"id\":\"I212743623300\",\"name\":\"Abraham STONER Steiner Shank (Find a Grave)\",\"sex\":\"M\",\"b\":\"1 NO\",\"bp\":\"Ayr\",\"d\":\"24 J\",\"dp\":\"East Huntingdon\",\"famc\":[\"F89\"],\"fams\":[\"F26\"]},\"I212645830960\":{\"id\":\"I212645830960\",\"name\":\"Ernest Ignatz Kuta\",\"sex\":\"M\",\"b\":\"1927\",\"bp\":\"Loup City, Nebraska\",\"d\":\"1995\",\"dp\":\"\",\"famc\":[\"F39\"],\"fams\":[\"F69\"]},\"I212743704101\":{\"id\":\"I212743704101\",\"name\":\"Theresia Melania Warlop\",\"sex\":\"F\",\"b\":\"4 De\",\"bp\":\"Sint-Eloois-Winkel\",\"d\":\"15 A\",\"dp\":\"Heule\",\"famc\":[],\"fams\":[\"F67\"]},\"I212743624181\":{\"id\":\"I212743624181\",\"name\":\"Frances (Frena) Feronica Elizabeth Dietz Musser\",\"sex\":\"F\",\"b\":\"1730\",\"bp\":\"Strasburg\",\"d\":\"28 N\",\"dp\":\"Conestoga\",\"famc\":[\"F97\"],\"fams\":[\"F32\"]},\"I212743608121\":{\"id\":\"I212743608121\",\"name\":\"Henrietta Stoner\",\"sex\":\"F\",\"b\":\"Feb \",\"bp\":\"Pennsylvania\",\"d\":\"1945\",\"dp\":\"\",\"famc\":[\"F15\"],\"fams\":[\"F62\"]},\"I212743616308\":{\"id\":\"I212743616308\",\"name\":\"Charles Wesley Swisher\",\"sex\":\"M\",\"b\":\"26 M\",\"bp\":\"Fairmont\",\"d\":\"9 Ap\",\"dp\":\"Fairmont\",\"famc\":[\"F7\"],\"fams\":[]},\"I212681004063\":{\"id\":\"I212681004063\",\"name\":\"Albert Bruce Taylor\",\"sex\":\"M\",\"b\":\"1879\",\"bp\":\"Boone County\",\"d\":\"1960\",\"dp\":\"Hotchkiss\",\"famc\":[\"F12\"],\"fams\":[\"F84\"]},\"I212743712643\":{\"id\":\"I212743712643\",\"name\":\"Elizabeth Allen Stone\",\"sex\":\"F\",\"b\":\"18 M\",\"bp\":\"\",\"d\":\"2 Ma\",\"dp\":\"\",\"famc\":[\"F96\"],\"fams\":[\"F20\"]},\"I212735163680\":{\"id\":\"I212735163680\",\"name\":\"Elizabeth Ellen Smith\",\"sex\":\"F\",\"b\":\"18 S\",\"bp\":\"Edgar\",\"d\":\"23 M\",\"dp\":\"Fairfield\",\"famc\":[\"F29\"],\"fams\":[]},\"I212743693164\":{\"id\":\"I212743693164\",\"name\":\"John Evins\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"USA\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F49\"],\"fams\":[]},\"I212743674587\":{\"id\":\"I212743674587\",\"name\":\"Jacob Evins\",\"sex\":\"M\",\"b\":\"\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F50\"],\"fams\":[]},\"I212730915509\":{\"id\":\"I212730915509\",\"name\":\"Elizabeth Jane Evans\",\"sex\":\"F\",\"b\":\"3 Ja\",\"bp\":\"Morgan\",\"d\":\"25 J\",\"dp\":\"Edgar\",\"famc\":[\"F18\"],\"fams\":[\"F29\",\"F16\"]},\"I212743705999\":{\"id\":\"I212743705999\",\"name\":\"Mary \\\"Polly\\\" Stodgel\",\"sex\":\"F\",\"b\":\"1791\",\"bp\":\"Wayne County\",\"d\":\"31 J\",\"dp\":\"Morgan Co.\",\"famc\":[\"F36\"],\"fams\":[\"F27\"]},\"I212743705000\":{\"id\":\"I212743705000\",\"name\":\"Nancy Seymour\",\"sex\":\"F\",\"b\":\"16 A\",\"bp\":\"Person\",\"d\":\"9 Ja\",\"dp\":\"Waverly\",\"famc\":[\"F68\"],\"fams\":[]},\"I212743705006\":{\"id\":\"I212743705006\",\"name\":\"May Evans\",\"sex\":\"F\",\"b\":\"1847\",\"bp\":\"Illinois\",\"d\":\"4 Ju\",\"dp\":\"Marysville\",\"famc\":[\"F18\",\"F55\"],\"fams\":[]},\"I212645830659\":{\"id\":\"I212645830659\",\"name\":\"Yvonne Annette Kuta\",\"sex\":\"F\",\"b\":\"1955\",\"bp\":\"Uravan, Colorado\",\"d\":\"2021\",\"dp\":\"Montrose, Colorado\",\"famc\":[\"F69\"],\"fams\":[\"F2\"]},\"I212743699130\":{\"id\":\"I212743699130\",\"name\":\"William Granderson Seymour\",\"sex\":\"M\",\"b\":\"21 J\",\"bp\":\"Fellside\",\"d\":\"01 J\",\"dp\":\"Virginia Colony\",\"famc\":[],\"fams\":[\"F1\"]},\"I212730943252\":{\"id\":\"I212730943252\",\"name\":\"John Phillip KETTLE VII\",\"sex\":\"M\",\"b\":\"9 Ap\",\"bp\":\"American Fork\",\"d\":\"28 A\",\"dp\":\"Ridgway\",\"famc\":[\"F64\"],\"fams\":[\"F25\"]},\"I212738461596\":{\"id\":\"I212738461596\",\"name\":\"Kaitlyn Grace Branson\",\"sex\":\"F\",\"b\":\"20 O\",\"bp\":\"Delta\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F23\"],\"fams\":[]},\"I212681009964\":{\"id\":\"I212681009964\",\"name\":\"Elizabeth Marie Kuta (Holvoet)\",\"sex\":\"F\",\"b\":\"1935\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F51\"],\"fams\":[\"F69\"]},\"I212743712552\":{\"id\":\"I212743712552\",\"name\":\"Agnieszka Agnes Torczon\",\"sex\":\"F\",\"b\":\"19 M\",\"bp\":\"Tarnov\",\"d\":\"23 J\",\"dp\":\"Tarnov\",\"famc\":[],\"fams\":[\"F63\"]},\"I212743636990\":{\"id\":\"I212743636990\",\"name\":\"William Evins\",\"sex\":\"M\",\"b\":\"Abt \",\"bp\":\"\",\"d\":\"Abt \",\"dp\":\"Caroline County\",\"famc\":[\"F98\"],\"fams\":[\"F88\"]},\"I212645831109\":{\"id\":\"I212645831109\",\"name\":\"Marie Eve Nosal\",\"sex\":\"F\",\"b\":\"1900\",\"bp\":\"Nebraska\",\"d\":\"1978\",\"dp\":\"Delta, Colorado\",\"famc\":[\"F63\"],\"fams\":[\"F39\"]},\"I212740887564\":{\"id\":\"I212740887564\",\"name\":\"Jules Gaston Verraest\",\"sex\":\"M\",\"b\":\"16 N\",\"bp\":\"Wevelgem\",\"d\":\"5 Ma\",\"dp\":\"Menen\",\"famc\":[\"F80\"],\"fams\":[]},\"I212735005097\":{\"id\":\"I212735005097\",\"name\":\"Enid S Smith\",\"sex\":\"F\",\"b\":\"1922\",\"bp\":\"Colorado\",\"d\":\"14 M\",\"dp\":\"Delta\",\"famc\":[\"F83\"],\"fams\":[]},\"I212681001989\":{\"id\":\"I212681001989\",\"name\":\"Charles E. Swisher\",\"sex\":\"M\",\"b\":\"1907\",\"bp\":\"\",\"d\":\"\",\"dp\":\"Cedaridge, Colorado\",\"famc\":[\"F62\"],\"fams\":[\"F34\"]},\"I212743608108\":{\"id\":\"I212743608108\",\"name\":\"Joseph M+ Swisher\",\"sex\":\"M\",\"b\":\"Jul \",\"bp\":\"West Virginia\",\"d\":\"1931\",\"dp\":\"\",\"famc\":[\"F7\"],\"fams\":[\"F62\"]},\"I212743699164\":{\"id\":\"I212743699164\",\"name\":\"James Pulliam Seymour\",\"sex\":\"M\",\"b\":\"24 D\",\"bp\":\"Person County\",\"d\":\"07 N\",\"dp\":\"Waverly\",\"famc\":[\"F76\"],\"fams\":[]},\"I212735019517\":{\"id\":\"I212735019517\",\"name\":\"Angeline A Kuta\",\"sex\":\"F\",\"b\":\"abt \",\"bp\":\"Nebraska\",\"d\":\"27 N\",\"dp\":\"Pueblo\",\"famc\":[\"F39\"],\"fams\":[]},\"I212743712585\":{\"id\":\"I212743712585\",\"name\":\"Martha Maria Rogghe\",\"sex\":\"F\",\"b\":\"24 J\",\"bp\":\"Wevelgem\",\"d\":\"7 Se\",\"dp\":\"Fruita\",\"famc\":[],\"fams\":[\"F81\"]},\"I212743699167\":{\"id\":\"I212743699167\",\"name\":\"William Seymour\",\"sex\":\"M\",\"b\":\"18 A\",\"bp\":\"Person\",\"d\":\"21 A\",\"dp\":\"Morgan\",\"famc\":[\"F76\"],\"fams\":[]},\"I212743629147\":{\"id\":\"I212743629147\",\"name\":\"David Evins\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"Virginia\",\"d\":\"Aft.\",\"dp\":\"Boyd's Creek\",\"famc\":[\"F101\"],\"fams\":[\"F6\"]},\"I212735163955\":{\"id\":\"I212735163955\",\"name\":\"Thomas J Smith\",\"sex\":\"M\",\"b\":\"Nov \",\"bp\":\"Nebraska\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F29\"],\"fams\":[]},\"I212743616296\":{\"id\":\"I212743616296\",\"name\":\"Elizabeth Abigail VanGilder\",\"sex\":\"F\",\"b\":\"7 Ju\",\"bp\":\"Fairmont\",\"d\":\"19 S\",\"dp\":\"Fairmont\",\"famc\":[],\"fams\":[\"F7\"]},\"I212743674589\":{\"id\":\"I212743674589\",\"name\":\"Margaret unk\",\"sex\":\"F\",\"b\":\"\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[],\"fams\":[\"F50\"]},\"I212743704999\":{\"id\":\"I212743704999\",\"name\":\"Peter Addison Seymour\",\"sex\":\"M\",\"b\":\"1814\",\"bp\":\"Person County\",\"d\":\"10 D\",\"dp\":\"Morgan\",\"famc\":[\"F68\"],\"fams\":[]},\"I212735163679\":{\"id\":\"I212735163679\",\"name\":\"Mary Elizabeth Smith\",\"sex\":\"F\",\"b\":\"26 J\",\"bp\":\"Edgar\",\"d\":\"19 N\",\"dp\":\"Nebraska\",\"famc\":[\"F29\"],\"fams\":[]},\"I212730915303\":{\"id\":\"I212730915303\",\"name\":\"Edward James Smith Sr.\",\"sex\":\"M\",\"b\":\"1800\",\"bp\":\"London, England\",\"d\":\"1890\",\"dp\":\"Middlesex\",\"famc\":[\"F53\"],\"fams\":[\"F9\"]},\"I212743616311\":{\"id\":\"I212743616311\",\"name\":\"Alpheus Milroy Swisher\",\"sex\":\"M\",\"b\":\"2 Ma\",\"bp\":\"Palentine\",\"d\":\"10 M\",\"dp\":\"Wheeling\",\"famc\":[\"F7\"],\"fams\":[]},\"I212730915421\":{\"id\":\"I212730915421\",\"name\":\"Edward Smith\",\"sex\":\"M\",\"b\":\"1770\",\"bp\":\"Hearn\",\"d\":\"abt \",\"dp\":\"\",\"famc\":[\"F52\"],\"fams\":[\"F53\"]},\"I212740240425\":{\"id\":\"I212740240425\",\"name\":\"Richard Ivan Smith\",\"sex\":\"M\",\"b\":\"25 O\",\"bp\":\"Delta\",\"d\":\"6 Ju\",\"dp\":\"Delta\",\"famc\":[\"F8\"],\"fams\":[\"F38\"]},\"I212743624262\":{\"id\":\"I212743624262\",\"name\":\"Joseph I Sherrick \\\\ Shirk\",\"sex\":\"M\",\"b\":\"Dec \",\"bp\":\"West Hempfield Twp\",\"d\":\"9 Ap\",\"dp\":\"Hempfield\",\"famc\":[],\"fams\":[\"F66\"]},\"I212680148980\":{\"id\":\"I212680148980\",\"name\":\"Elizabeth J Smith\",\"sex\":\"F\",\"b\":\"Jan \",\"bp\":\"Illinois\",\"d\":\"25 J\",\"dp\":\"Edgar\",\"famc\":[\"F55\"],\"fams\":[\"F54\"]},\"I212743706133\":{\"id\":\"I212743706133\",\"name\":\"Stodgel\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"Virginia\",\"d\":\"Abt.\",\"dp\":\"Wayne County\",\"famc\":[],\"fams\":[\"F36\"]},\"I212743699142\":{\"id\":\"I212743699142\",\"name\":\"Nancy Seymour\",\"sex\":\"F\",\"b\":\"16 A\",\"bp\":\"Person\",\"d\":\"09 J\",\"dp\":\"Morgan\",\"famc\":[\"F76\"],\"fams\":[]},\"I212743705326\":{\"id\":\"I212743705326\",\"name\":\"William M Evans\",\"sex\":\"M\",\"b\":\"abt \",\"bp\":\"Illinois\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F59\"],\"fams\":[]},\"I212743712896\":{\"id\":\"I212743712896\",\"name\":\"Ursula \\\"Ursley\\\" Stone\",\"sex\":\"F\",\"b\":\"1738\",\"bp\":\"\",\"d\":\"1793\",\"dp\":\"\",\"famc\":[\"F73\"],\"fams\":[\"F22\"]},\"I212743706376\":{\"id\":\"I212743706376\",\"name\":\"Nosal\",\"sex\":\"F\",\"b\":\"Abt.\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F87\"],\"fams\":[]},\"I212743628784\":{\"id\":\"I212743628784\",\"name\":\"James Evans (Evins)\",\"sex\":\"M\",\"b\":\"1770\",\"bp\":\"Wayne County\",\"d\":\"1850\",\"dp\":\"Morgan Co., IL\",\"famc\":[\"F6\"],\"fams\":[\"F27\"]},\"I212743639013\":{\"id\":\"I212743639013\",\"name\":\"John Evins Sr.\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"\",\"d\":\"Bef.\",\"dp\":\"Caroline County\",\"famc\":[\"F88\"],\"fams\":[]},\"I212680148055\":{\"id\":\"I212680148055\",\"name\":\"Leah Emma Kettle\",\"sex\":\"F\",\"b\":\"6 Fe\",\"bp\":\"Ridgway\",\"d\":\"9 Ap\",\"dp\":\"Denver\",\"famc\":[\"F25\"],\"fams\":[\"F83\",\"F75\"]},\"I212743633836\":{\"id\":\"I212743633836\",\"name\":\"George Washington Evans\",\"sex\":\"M\",\"b\":\"27 J\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F45\"],\"fams\":[]},\"I212743712633\":{\"id\":\"I212743712633\",\"name\":\"James C. Pulliam\",\"sex\":\"M\",\"b\":\"1734\",\"bp\":\"Hanover\",\"d\":\"19 A\",\"dp\":\"Person County\",\"famc\":[\"F100\"],\"fams\":[\"F20\"]},\"I212743630972\":{\"id\":\"I212743630972\",\"name\":\"David Evans\",\"sex\":\"M\",\"b\":\"1855\",\"bp\":\"Illinois\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F59\"],\"fams\":[]},\"I212735163688\":{\"id\":\"I212735163688\",\"name\":\"Margaret Evans\",\"sex\":\"F\",\"b\":\"Apr \",\"bp\":\"Morgan\",\"d\":\"25 O\",\"dp\":\"Morgan\",\"famc\":[\"F18\"],\"fams\":[]},\"I212740886457\":{\"id\":\"I212740886457\",\"name\":\"John Henri Verraest\",\"sex\":\"M\",\"b\":\"1883\",\"bp\":\"Wevelgem, Belgium\",\"d\":\"1955\",\"dp\":\"Fruita, Colorado\",\"famc\":[\"F80\"],\"fams\":[\"F81\"]},\"I212730914926\":{\"id\":\"I212730914926\",\"name\":\"William Wilson\",\"sex\":\"M\",\"b\":\"23 J\",\"bp\":\"Smith\",\"d\":\"6 Au\",\"dp\":\"Round Grove\",\"famc\":[],\"fams\":[\"F57\"]},\"I212730915268\":{\"id\":\"I212730915268\",\"name\":\"Ruth Ann Jay\",\"sex\":\"F\",\"b\":\"31 O\",\"bp\":\"Trenton\",\"d\":\"7 No\",\"dp\":\"Cory\",\"famc\":[\"F19\"],\"fams\":[\"F25\"]},\"I212645831955\":{\"id\":\"I212645831955\",\"name\":\"Edward James Smith Jr.\",\"sex\":\"M\",\"b\":\"1838\",\"bp\":\"London, England\",\"d\":\"1906\",\"dp\":\"Edgar, Illinois\",\"famc\":[\"F9\"],\"fams\":[\"F54\",\"F29\"]},\"I212735163693\":{\"id\":\"I212735163693\",\"name\":\"Charles Edgar Evans\",\"sex\":\"M\",\"b\":\"13 F\",\"bp\":\"Littleton\",\"d\":\"17 O\",\"dp\":\"Morgan\",\"famc\":[\"F18\"],\"fams\":[]},\"I212743630900\":{\"id\":\"I212743630900\",\"name\":\"Elizabeth Jane Evans\",\"sex\":\"F\",\"b\":\"3 Ja\",\"bp\":\"Franklin\",\"d\":\"25 J\",\"dp\":\"Clay County\",\"famc\":[\"F55\",\"F58\",\"F59\"],\"fams\":[]},\"I212743675928\":{\"id\":\"I212743675928\",\"name\":\"Thomas Evans\",\"sex\":\"M\",\"b\":\"1660\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[],\"fams\":[\"F92\"]},\"I212743616305\":{\"id\":\"I212743616305\",\"name\":\"Salinda Mary Swisher\",\"sex\":\"F\",\"b\":\"16 M\",\"bp\":\"Winfield\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F60\"],\"fams\":[]},\"I212743706105\":{\"id\":\"I212743706105\",\"name\":\"Sarah Sary\",\"sex\":\"F\",\"b\":\"Abt.\",\"bp\":\"Virginia\",\"d\":\"Abt.\",\"dp\":\"Wayne County\",\"famc\":[],\"fams\":[\"F36\"]},\"I212735019830\":{\"id\":\"I212735019830\",\"name\":\"Dolores Ann Dickerson\",\"sex\":\"U\",\"b\":\"16 F\",\"bp\":\"Sherman County\",\"d\":\"6 Fe\",\"dp\":\"California\",\"famc\":[\"F39\"],\"fams\":[]},\"I212743630796\":{\"id\":\"I212743630796\",\"name\":\"William McFarland Evans\",\"sex\":\"M\",\"b\":\"27 M\",\"bp\":\"Wayne County\",\"d\":\"29 F\",\"dp\":\"Morgan County\",\"famc\":[\"F45\"],\"fams\":[\"F58\",\"F59\"]},\"I212733275395\":{\"id\":\"I212733275395\",\"name\":\"Amy Seymour\",\"sex\":\"F\",\"b\":\"1818\",\"bp\":\"Person County, NC\",\"d\":\"1905\",\"dp\":\"Morgan County, IL\",\"famc\":[\"F68\",\"F76\"],\"fams\":[\"F55\",\"F18\",\"F58\",\"F65\",\"F56\",\"F37\"]},\"I212735163686\":{\"id\":\"I212735163686\",\"name\":\"James Andrew Evans\",\"sex\":\"M\",\"b\":\"22 N\",\"bp\":\"Scottville\",\"d\":\"13 A\",\"dp\":\"Evanston\",\"famc\":[\"F18\"],\"fams\":[]},\"I212743704995\":{\"id\":\"I212743704995\",\"name\":\"Robert Seymour Sr\",\"sex\":\"M\",\"b\":\"3 Ma\",\"bp\":\"Person County\",\"d\":\"20 J\",\"dp\":\"Nr Franklin\",\"famc\":[\"F68\"],\"fams\":[]},\"I212743706250\":{\"id\":\"I212743706250\",\"name\":\"Adam Wypior\",\"sex\":\"M\",\"b\":\"1797\",\"bp\":\"\",\"d\":\"24 M\",\"dp\":\"Pogorska Wola\",\"famc\":[],\"fams\":[\"F95\"]},\"I212735004905\":{\"id\":\"I212735004905\",\"name\":\"James Evans  (Evins)\",\"sex\":\"M\",\"b\":\"1770\",\"bp\":\"Wayne County\",\"d\":\"2 Oc\",\"dp\":\"Morgan County\",\"famc\":[],\"fams\":[\"F90\"]},\"I212743616314\":{\"id\":\"I212743616314\",\"name\":\"James Hiram Swisher\",\"sex\":\"M\",\"b\":\"13 M\",\"bp\":\"Marion County\",\"d\":\"24 S\",\"dp\":\"Grafton\",\"famc\":[\"F7\"],\"fams\":[]},\"I212735163681\":{\"id\":\"I212735163681\",\"name\":\"George Wyman Smith\",\"sex\":\"M\",\"b\":\"23 O\",\"bp\":\"Jacksonville\",\"d\":\"28 S\",\"dp\":\"Hastings\",\"famc\":[\"F29\"],\"fams\":[]},\"I212740857784\":{\"id\":\"I212740857784\",\"name\":\"Elisa Irma Verraest\",\"sex\":\"F\",\"b\":\"1909\",\"bp\":\"Wevelgem, Belgium\",\"d\":\"1987\",\"dp\":\"\",\"famc\":[\"F81\"],\"fams\":[\"F51\"]},\"I212743706185\":{\"id\":\"I212743706185\",\"name\":\"Bart\\u0142omiej Nosal\",\"sex\":\"M\",\"b\":\"1830\",\"bp\":\"Tarn\\u00f3w, Poland\",\"d\":\"10 N\",\"dp\":\"Turnov\",\"famc\":[],\"fams\":[\"F87\"]},\"I212743704994\":{\"id\":\"I212743704994\",\"name\":\"William Seymour\",\"sex\":\"M\",\"b\":\"18 A\",\"bp\":\"Person\",\"d\":\"21 A\",\"dp\":\"Morgan County\",\"famc\":[\"F68\"],\"fams\":[]},\"I212743633839\":{\"id\":\"I212743633839\",\"name\":\"Sally Cornet Evans\",\"sex\":\"F\",\"b\":\"13 M\",\"bp\":\"Wayne County\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F45\"],\"fams\":[]},\"I212743704021\":{\"id\":\"I212743704021\",\"name\":\"Emma Elisa Vansteenkiste\",\"sex\":\"F\",\"b\":\"08 J\",\"bp\":\"Heule\",\"d\":\"16 J\",\"dp\":\"Belgium\",\"famc\":[\"F67\"],\"fams\":[\"F46\"]},\"I212743622891\":{\"id\":\"I212743622891\",\"name\":\"Christian Sherrick Stoner\",\"sex\":\"M\",\"b\":\"15 S\",\"bp\":\"East Huntingdon\",\"d\":\"16 J\",\"dp\":\"East Huntingdon\",\"famc\":[\"F26\"],\"fams\":[\"F15\"]},\"I212743616297\":{\"id\":\"I212743616297\",\"name\":\"John W. Swisher\",\"sex\":\"M\",\"b\":\"18 O\",\"bp\":\"Winfield\",\"d\":\"8 Ja\",\"dp\":\"Fairmont\",\"famc\":[\"F60\"],\"fams\":[]},\"I212743616318\":{\"id\":\"I212743616318\",\"name\":\"Camden Swisher\",\"sex\":\"M\",\"b\":\"10 F\",\"bp\":\"Marion\",\"d\":\"9 Ap\",\"dp\":\"Fairmont\",\"famc\":[\"F7\"],\"fams\":[]},\"I212743717377\":{\"id\":\"I212743717377\",\"name\":\"John Marson Kettle\",\"sex\":\"M\",\"b\":\"1 Fe\",\"bp\":\"Newton By Folkingham\",\"d\":\"17 O\",\"dp\":\"American Fork\",\"famc\":[\"F4\"],\"fams\":[\"F99\"]},\"I212743705329\":{\"id\":\"I212743705329\",\"name\":\"Alta Mae Evans\",\"sex\":\"F\",\"b\":\"30 A\",\"bp\":\"Illinois\",\"d\":\"4 Ju\",\"dp\":\"Marysville\",\"famc\":[\"F59\"],\"fams\":[]},\"I212743706378\":{\"id\":\"I212743706378\",\"name\":\"Michael Nosol\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"Poland Austria\",\"d\":\"26 A\",\"dp\":\"Duncan\",\"famc\":[\"F87\"],\"fams\":[]},\"I212743712893\":{\"id\":\"I212743712893\",\"name\":\"Eusebius Stone\",\"sex\":\"M\",\"b\":\"1720\",\"bp\":\"\",\"d\":\"8 No\",\"dp\":\"Patrick County\",\"famc\":[\"F73\"],\"fams\":[]},\"I212738034389\":{\"id\":\"I212738034389\",\"name\":\"John Granderson Seymour\",\"sex\":\"M\",\"b\":\"11 N\",\"bp\":\"Middlesex\",\"d\":\"12 A\",\"dp\":\"Morgan\",\"famc\":[\"F1\"],\"fams\":[\"F76\"]},\"I212743705004\":{\"id\":\"I212743705004\",\"name\":\"King Edward Seymour\",\"sex\":\"M\",\"b\":\"20 S\",\"bp\":\"Person\",\"d\":\"17 A\",\"dp\":\"Morgan\",\"famc\":[\"F68\"],\"fams\":[]},\"I212743616299\":{\"id\":\"I212743616299\",\"name\":\"Oliver Swisher\",\"sex\":\"M\",\"b\":\"1859\",\"bp\":\"Marion Co. Virginia\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F60\"],\"fams\":[]},\"I212735019518\":{\"id\":\"I212735019518\",\"name\":\"Arnold J Kuta\",\"sex\":\"M\",\"b\":\"abt \",\"bp\":\"Nebraska\",\"d\":\"12 F\",\"dp\":\"Davenport\",\"famc\":[\"F39\"],\"fams\":[]},\"I212743705001\":{\"id\":\"I212743705001\",\"name\":\"Elizabeth Seymour\",\"sex\":\"F\",\"b\":\"25 D\",\"bp\":\"Person County\",\"d\":\"5 Ja\",\"dp\":\"Morgan\",\"famc\":[\"F68\"],\"fams\":[]},\"I212733634289\":{\"id\":\"I212733634289\",\"name\":\"John S Kettle\",\"sex\":\"M\",\"b\":\"1898\",\"bp\":\"Colorado\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F25\"],\"fams\":[]},\"I212743633838\":{\"id\":\"I212743633838\",\"name\":\"Martha Evans\",\"sex\":\"F\",\"b\":\"21 J\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F45\"],\"fams\":[]},\"I212743674593\":{\"id\":\"I212743674593\",\"name\":\"Thomas Evans\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F49\"],\"fams\":[]},\"I212735163687\":{\"id\":\"I212735163687\",\"name\":\"David Hart Evans\",\"sex\":\"M\",\"b\":\"30 M\",\"bp\":\"Harts Prairie near Franklin\",\"d\":\"22 M\",\"dp\":\"Coupeville\",\"famc\":[\"F18\"],\"fams\":[]},\"I212743633833\":{\"id\":\"I212743633833\",\"name\":\"Stodgel\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"Virginia\",\"d\":\"\",\"dp\":\"\",\"famc\":[],\"fams\":[\"F13\"]},\"I212743674597\":{\"id\":\"I212743674597\",\"name\":\"Andrew Evins Sr.\",\"sex\":\"M\",\"b\":\"28 S\",\"bp\":\"Anson County (now Mecklenburg County)\",\"d\":\"5 De\",\"dp\":\"Harrison\",\"famc\":[\"F49\"],\"fams\":[]},\"I212735163676\":{\"id\":\"I212735163676\",\"name\":\"John Franklin Smith\",\"sex\":\"M\",\"b\":\"3 De\",\"bp\":\"Jacksonville\",\"d\":\"5 De\",\"dp\":\"Independence\",\"famc\":[\"F29\"],\"fams\":[]},\"I212743706380\":{\"id\":\"I212743706380\",\"name\":\"Mark Nosal\",\"sex\":\"M\",\"b\":\"25 A\",\"bp\":\"Poland Austria\",\"d\":\"3 No\",\"dp\":\"Hennepin County\",\"famc\":[\"F87\"],\"fams\":[]},\"I212735163677\":{\"id\":\"I212735163677\",\"name\":\"Mattie Frances Smith\",\"sex\":\"F\",\"b\":\"26 S\",\"bp\":\"Edgar\",\"d\":\"05 A\",\"dp\":\"Bertrand\",\"famc\":[\"F29\"],\"fams\":[]},\"I212743712780\":{\"id\":\"I212743712780\",\"name\":\"William I (1683-1729) Stone of York 1695 md Sarah LNU; 1699 Elizabeth Robertson Dennett filMgm4c6\",\"sex\":\"M\",\"b\":\"Janu\",\"bp\":\"North Farnham Parrish\",\"d\":\"3 Ma\",\"dp\":\"Amelia County\",\"famc\":[\"F79\"],\"fams\":[\"F73\",\"F74\",\"F93\"]},\"I212743699125\":{\"id\":\"I212743699125\",\"name\":\"Savanah Seymore (N.C Spelling)\",\"sex\":\"F\",\"b\":\"\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F1\"],\"fams\":[]},\"I212743717887\":{\"id\":\"I212743717887\",\"name\":\"Elizabeth GRATRIX\",\"sex\":\"F\",\"b\":\"21 D\",\"bp\":\"Ancaster\",\"d\":\"20 N\",\"dp\":\"Gosberton\",\"famc\":[],\"fams\":[\"F4\"]},\"I212743632625\":{\"id\":\"I212743632625\",\"name\":\"Sarah Sary\",\"sex\":\"F\",\"b\":\"Abt.\",\"bp\":\"Virginia\",\"d\":\"Abt.\",\"dp\":\"Wayne\",\"famc\":[],\"fams\":[\"F13\"]},\"I212743630973\":{\"id\":\"I212743630973\",\"name\":\"Martha A Evans\",\"sex\":\"F\",\"b\":\"11 S\",\"bp\":\"Tennessee\",\"d\":\"14 J\",\"dp\":\"King County\",\"famc\":[],\"fams\":[\"F59\"]},\"I212735134538\":{\"id\":\"I212735134538\",\"name\":\"Jane HEYS\",\"sex\":\"F\",\"b\":\"\",\"bp\":\"England\",\"d\":\"\",\"dp\":\"\",\"famc\":[],\"fams\":[\"F52\"]},\"I212743630797\":{\"id\":\"I212743630797\",\"name\":\"William Evans\",\"sex\":\"M\",\"b\":\"\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[],\"fams\":[\"F56\"]},\"I212743705005\":{\"id\":\"I212743705005\",\"name\":\"Byrd Seymour\",\"sex\":\"M\",\"b\":\"28 A\",\"bp\":\"Person\",\"d\":\"28 A\",\"dp\":\"Nortonville\",\"famc\":[\"F68\"],\"fams\":[]},\"I212738461540\":{\"id\":\"I212738461540\",\"name\":\"Megan Rose Branson\",\"sex\":\"F\",\"b\":\"2000\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F23\"],\"fams\":[]},\"I212743614200\":{\"id\":\"I212743614200\",\"name\":\"Samuel Jay\",\"sex\":\"M\",\"b\":\"29 A\",\"bp\":\"Wayne\",\"d\":\"4 De\",\"dp\":\"Ridgway\",\"famc\":[],\"fams\":[\"F19\"]},\"I212743704100\":{\"id\":\"I212743704100\",\"name\":\"Ivo Vansteenkiste\",\"sex\":\"M\",\"b\":\"1 Ma\",\"bp\":\"Sint-Baafs-Vijve\",\"d\":\"23 J\",\"dp\":\"Heule\",\"famc\":[],\"fams\":[\"F67\"]},\"I212743624960\":{\"id\":\"I212743624960\",\"name\":\"Tobias Shank\",\"sex\":\"M\",\"b\":\"1734\",\"bp\":\"Conestoga\",\"d\":\"1767\",\"dp\":\"Conestoga\",\"famc\":[],\"fams\":[\"F47\"]},\"I212738034679\":{\"id\":\"I212738034679\",\"name\":\"John Granderson Seymour\",\"sex\":\"M\",\"b\":\"11 O\",\"bp\":\"Person Co.\",\"d\":\"12 A\",\"dp\":\"Morgan Co.\",\"famc\":[],\"fams\":[\"F68\"]},\"I212740886858\":{\"id\":\"I212740886858\",\"name\":\"Petrus Franciscus Verraest\",\"sex\":\"M\",\"b\":\"1826\",\"bp\":\"Wevelgem\",\"d\":\"23 S\",\"dp\":\"Wevelgem\",\"famc\":[],\"fams\":[\"F14\"]},\"I212743624202\":{\"id\":\"I212743624202\",\"name\":\"Peter Mosser\\\\Musser\",\"sex\":\"M\",\"b\":\"30 S\",\"bp\":\"Strasburg\",\"d\":\"1794\",\"dp\":\"Strasburg\",\"famc\":[],\"fams\":[\"F32\"]},\"I212743699153\":{\"id\":\"I212743699153\",\"name\":\"Martha Patsy Seymour\",\"sex\":\"F\",\"b\":\"13 J\",\"bp\":\"Person\",\"d\":\"08 A\",\"dp\":\"Morgan\",\"famc\":[\"F76\"],\"fams\":[]},\"I212743616303\":{\"id\":\"I212743616303\",\"name\":\"Silas R. Swisher\",\"sex\":\"M\",\"b\":\"abt \",\"bp\":\"Ohio\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F60\"],\"fams\":[]},\"I212743712888\":{\"id\":\"I212743712888\",\"name\":\"Sarah Stone\",\"sex\":\"F\",\"b\":\"3 Ma\",\"bp\":\"Caroline\",\"d\":\"1750\",\"dp\":\"Caroline\",\"famc\":[\"F79\"],\"fams\":[]},\"I212743624129\":{\"id\":\"I212743624129\",\"name\":\"Rev Joseph C Sherrick Sherg III\",\"sex\":\"M\",\"b\":\"25 D\",\"bp\":\"Hempfield\",\"d\":\"21 D\",\"dp\":\"Fayette City\",\"famc\":[\"F66\"],\"fams\":[\"F42\"]},\"I212735163683\":{\"id\":\"I212735163683\",\"name\":\"Martha Evans\",\"sex\":\"F\",\"b\":\"9 Ma\",\"bp\":\"Morgan County\",\"d\":\"30 A\",\"dp\":\"Edgar\",\"famc\":[\"F18\"],\"fams\":[]},\"I212743705002\":{\"id\":\"I212743705002\",\"name\":\"John Seymour\",\"sex\":\"M\",\"b\":\"9 Ju\",\"bp\":\"Person\",\"d\":\"17 M\",\"dp\":\"Franklin\",\"famc\":[\"F68\"],\"fams\":[]},\"I212743616307\":{\"id\":\"I212743616307\",\"name\":\"Rachel R. Swisher\",\"sex\":\"F\",\"b\":\"20 o\",\"bp\":\"Marion County\",\"d\":\"28 J\",\"dp\":\"Berkeley\",\"famc\":[\"F60\"],\"fams\":[]},\"I212743636384\":{\"id\":\"I212743636384\",\"name\":\"Ann Borch\",\"sex\":\"F\",\"b\":\"Abt.\",\"bp\":\"Virginia\",\"d\":\"Abt.\",\"dp\":\"Tennessee\",\"famc\":[],\"fams\":[\"F6\"]},\"I212743608157\":{\"id\":\"I212743608157\",\"name\":\"Mary Ann KELLY\",\"sex\":\"F\",\"b\":\"2 Ma\",\"bp\":\"Hampton Bishop\",\"d\":\"11 M\",\"dp\":\"Ridgway\",\"famc\":[],\"fams\":[\"F64\"]},\"I212738034393\":{\"id\":\"I212738034393\",\"name\":\"Agnes Allen Pulliam\",\"sex\":\"F\",\"b\":\"3 Ap\",\"bp\":\"Paris\",\"d\":\"23 J\",\"dp\":\"Franklin\",\"famc\":[],\"fams\":[\"F76\"]},\"I212743624229\":{\"id\":\"I212743624229\",\"name\":\"Susanna Strickler (Sherrick) aka Shirk\",\"sex\":\"F\",\"b\":\"2 Ma\",\"bp\":\"Columbia\",\"d\":\"9 Ap\",\"dp\":\"Hempfield Twp\",\"famc\":[],\"fams\":[\"F66\"]},\"I212743616310\":{\"id\":\"I212743616310\",\"name\":\"Infant Swisher\",\"sex\":\"F\",\"b\":\"07 J\",\"bp\":\"Marion\",\"d\":\"30 J\",\"dp\":\"Marion\",\"famc\":[\"F7\"],\"fams\":[]},\"I212743616306\":{\"id\":\"I212743616306\",\"name\":\"Catherine Jane Swisher\",\"sex\":\"F\",\"b\":\"20 M\",\"bp\":\"Winfield\",\"d\":\"29 o\",\"dp\":\"West Virginia\",\"famc\":[\"F60\"],\"fams\":[]},\"I212743674595\":{\"id\":\"I212743674595\",\"name\":\"Nathaniel Evins\",\"sex\":\"M\",\"b\":\"1756\",\"bp\":\"Probably Anson County (now Mecklenburg County)\",\"d\":\"1826\",\"dp\":\"White County\",\"famc\":[\"F49\"],\"fams\":[]},\"I212743699134\":{\"id\":\"I212743699134\",\"name\":\"Margaret Carpinter\",\"sex\":\"F\",\"b\":\"abou\",\"bp\":\"Tanfield\",\"d\":\"5 Ju\",\"dp\":\"Sunderland\",\"famc\":[],\"fams\":[\"F1\"]},\"I212743674594\":{\"id\":\"I212743674594\",\"name\":\"William Evans Sr.\",\"sex\":\"M\",\"b\":\"27 M\",\"bp\":\"\",\"d\":\"29 F\",\"dp\":\"\",\"famc\":[\"F49\"],\"fams\":[\"F37\"]},\"I212743675924\":{\"id\":\"I212743675924\",\"name\":\"William Evins\",\"sex\":\"M\",\"b\":\"Abt \",\"bp\":\"\",\"d\":\"Abt \",\"dp\":\"Caroline County\",\"famc\":[\"F92\"],\"fams\":[\"F91\"]},\"I212743614618\":{\"id\":\"I212743614618\",\"name\":\"Eliza Ann Harper\",\"sex\":\"F\",\"b\":\"12 F\",\"bp\":\"Fallowfield Township\",\"d\":\"04 M\",\"dp\":\"Ridgway\",\"famc\":[],\"fams\":[\"F19\"]},\"I212743704329\":{\"id\":\"I212743704329\",\"name\":\"James Stephan Smith\",\"sex\":\"M\",\"b\":\"13 J\",\"bp\":\"Delta\",\"d\":\"22 A\",\"dp\":\"Montrose County\",\"famc\":[\"F8\"],\"fams\":[\"F48\"]},\"I212743615027\":{\"id\":\"I212743615027\",\"name\":\"Sarah E Morgan\",\"sex\":\"F\",\"b\":\"17 S\",\"bp\":\"(Bunner Ridge) Fairmont\",\"d\":\"9 Oc\",\"dp\":\"Fairmont\",\"famc\":[],\"fams\":[\"F60\"]},\"I212740887461\":{\"id\":\"I212740887461\",\"name\":\"Aloysia Emma Catteeuw\",\"sex\":\"F\",\"b\":\"1 Ap\",\"bp\":\"Wevelgem\",\"d\":\"10 F\",\"dp\":\"Wevelgem\",\"famc\":[\"F44\"],\"fams\":[\"F80\"]},\"I212743699150\":{\"id\":\"I212743699150\",\"name\":\"Byrd Bird Seymour\",\"sex\":\"M\",\"b\":\"28 A\",\"bp\":\"Person County\",\"d\":\"28 A\",\"dp\":\"Nortonville\",\"famc\":[\"F76\"],\"fams\":[]},\"I212735163672\":{\"id\":\"I212735163672\",\"name\":\"William McFarland Evans\",\"sex\":\"M\",\"b\":\"1814\",\"bp\":\"Wayne County, TN\",\"d\":\"1892\",\"dp\":\"Pulaski\",\"famc\":[\"F27\"],\"fams\":[\"F18\"]},\"I212743616300\":{\"id\":\"I212743616300\",\"name\":\"Sarpeta Swisher\",\"sex\":\"F\",\"b\":\"11 m\",\"bp\":\"Marion County\",\"d\":\"24 M\",\"dp\":\"Fairmont\",\"famc\":[\"F60\"],\"fams\":[]},\"I212743706191\":{\"id\":\"I212743706191\",\"name\":\"Tekla Veipor Boruch\",\"sex\":\"F\",\"b\":\"1830\",\"bp\":\"Poland\",\"d\":\"1 Ma\",\"dp\":\"Tarnov\",\"famc\":[\"F95\"],\"fams\":[\"F87\"]},\"I212740886859\":{\"id\":\"I212740886859\",\"name\":\"Mathilde Juditte Laroye\",\"sex\":\"F\",\"b\":\"1827\",\"bp\":\"Moorsele (B-8560)\",\"d\":\"1895\",\"dp\":\"Wevelgem\",\"famc\":[],\"fams\":[\"F14\"]},\"I212743622903\":{\"id\":\"I212743622903\",\"name\":\"Mary (Musser) SHERRICK (Shirk)\",\"sex\":\"F\",\"b\":\"14 D\",\"bp\":\"Tyrone Township\",\"d\":\"11 O\",\"dp\":\"East Huntingdon Township\",\"famc\":[\"F42\"],\"fams\":[\"F26\"]},\"I212733634291\":{\"id\":\"I212733634291\",\"name\":\"Beulah S Kettle\",\"sex\":\"F\",\"b\":\"1906\",\"bp\":\"Colorado\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F25\"],\"fams\":[]},\"I212743721214\":{\"id\":\"I212743721214\",\"name\":\"Jim\",\"sex\":\"M\",\"b\":\"\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F8\"],\"fams\":[]},\"I212743633835\":{\"id\":\"I212743633835\",\"name\":\"Nathaniel Munroe Evans\",\"sex\":\"M\",\"b\":\"25 M\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F45\"],\"fams\":[]},\"I212743704993\":{\"id\":\"I212743704993\",\"name\":\"Martha Seymour\",\"sex\":\"F\",\"b\":\"13 J\",\"bp\":\"Person\",\"d\":\"8 Au\",\"dp\":\"Morgan\",\"famc\":[\"F68\"],\"fams\":[]},\"I212730914958\":{\"id\":\"I212730914958\",\"name\":\"Rebecca Ann Williamson Bowles\",\"sex\":\"F\",\"b\":\"02 S\",\"bp\":\"Henrico County\",\"d\":\"19 J\",\"dp\":\"Dade County\",\"famc\":[],\"fams\":[\"F57\"]},\"I212743614628\":{\"id\":\"I212743614628\",\"name\":\"Alpheus P. Swisher\",\"sex\":\"M\",\"b\":\"1826\",\"bp\":\"Winfield, WV\",\"d\":\"1901\",\"dp\":\"Marion County\",\"famc\":[\"F60\"],\"fams\":[\"F7\"]},\"I212645830805\":{\"id\":\"I212645830805\",\"name\":\"Norman Smith\",\"sex\":\"M\",\"b\":\"1952\",\"bp\":\"Delta County, Colorado\",\"d\":\"2025\",\"dp\":\"Montrose, Colorado\",\"famc\":[\"F8\"],\"fams\":[\"F2\",\"F3\"]},\"I212743705327\":{\"id\":\"I212743705327\",\"name\":\"Edgar Evans\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"Illinois\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F59\"],\"fams\":[]},\"I212735134539\":{\"id\":\"I212735134539\",\"name\":\"Jane Elizabeth\",\"sex\":\"F\",\"b\":\"\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[],\"fams\":[\"F53\"]},\"I212681006604\":{\"id\":\"I212681006604\",\"name\":\"Luella Wilson Taylor\",\"sex\":\"F\",\"b\":\"1882\",\"bp\":\"Kings Point\",\"d\":\"1965\",\"dp\":\"Hotchkiss\",\"famc\":[\"F57\"],\"fams\":[\"F84\"]},\"I212743712891\":{\"id\":\"I212743712891\",\"name\":\"Stephen Stone SR\",\"sex\":\"M\",\"b\":\"12 O\",\"bp\":\"Caroline County\",\"d\":\"16 A\",\"dp\":\"Sumner County\",\"famc\":[\"F73\"],\"fams\":[]},\"I212743699160\":{\"id\":\"I212743699160\",\"name\":\"John Seymour\",\"sex\":\"M\",\"b\":\"09 J\",\"bp\":\"Person\",\"d\":\"17 M\",\"dp\":\"Franklin\",\"famc\":[\"F76\"],\"fams\":[]},\"I212743616320\":{\"id\":\"I212743616320\",\"name\":\"Harriett SWISHER\",\"sex\":\"F\",\"b\":\"1857\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F7\"],\"fams\":[]},\"I212741723429\":{\"id\":\"I212741723429\",\"name\":\"Joseph Henri Holvoet\",\"sex\":\"M\",\"b\":\"1906\",\"bp\":\"Bissegem, Belgium\",\"d\":\"1967\",\"dp\":\"Hotchkiss, Colorado\",\"famc\":[\"F61\"],\"fams\":[\"F51\"]},\"I212743632597\":{\"id\":\"I212743632597\",\"name\":\"Mary \\\"Polly\\\" Stodgel\",\"sex\":\"F\",\"b\":\"1791\",\"bp\":\"Wayne County\",\"d\":\"31 J\",\"dp\":\"Morgan County\",\"famc\":[\"F13\"],\"fams\":[\"F45\"]},\"I212681011251\":{\"id\":\"I212681011251\",\"name\":\"Alissa Jenee Branson\",\"sex\":\"F\",\"b\":\"1973\",\"bp\":\"Delta, Colorado\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F2\"],\"fams\":[\"F23\"]},\"I212743699146\":{\"id\":\"I212743699146\",\"name\":\"Peter Addison Seymour\",\"sex\":\"M\",\"b\":\"Marc\",\"bp\":\"Person\",\"d\":\"10 D\",\"dp\":\"Morgan\",\"famc\":[\"F76\"],\"fams\":[]},\"I212743720567\":{\"id\":\"I212743720567\",\"name\":\"Peggy Charlene Swisher\",\"sex\":\"F\",\"b\":\"1925\",\"bp\":\"Hotchkiss, Colorado\",\"d\":\"1996\",\"dp\":\"Delta, Colorado\",\"famc\":[\"F34\"],\"fams\":[\"F8\"]},\"I212681011315\":{\"id\":\"I212681011315\",\"name\":\"Derek Compton Smith\",\"sex\":\"M\",\"b\":\"1976\",\"bp\":\"Delta, Colorado\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F2\"],\"fams\":[]},\"I212743674590\":{\"id\":\"I212743674590\",\"name\":\"unk mother\",\"sex\":\"F\",\"b\":\"Abt.\",\"bp\":\"\",\"d\":\"Abt.\",\"dp\":\"Tennessee\",\"famc\":[],\"fams\":[\"F49\"]},\"I212743712564\":{\"id\":\"I212743712564\",\"name\":\"Alice Maria Coolsaet\",\"sex\":\"F\",\"b\":\"15 A\",\"bp\":\"Bissegem\",\"d\":\"28 J\",\"dp\":\"Hotchkiss\",\"famc\":[],\"fams\":[\"F61\"]},\"I212735163689\":{\"id\":\"I212735163689\",\"name\":\"William Monroe Evans\",\"sex\":\"M\",\"b\":\"18 O\",\"bp\":\"Manchester\",\"d\":\"27 N\",\"dp\":\"Charleston\",\"famc\":[\"F18\"],\"fams\":[\"F10\"]},\"I212743705003\":{\"id\":\"I212743705003\",\"name\":\"James Pulliam Seymour\",\"sex\":\"M\",\"b\":\"24 D\",\"bp\":\"Person County\",\"d\":\"7 No\",\"dp\":\"Waverly\",\"famc\":[\"F68\"],\"fams\":[]},\"I212743633837\":{\"id\":\"I212743633837\",\"name\":\"Paulina Evans\",\"sex\":\"F\",\"b\":\"18 M\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F45\"],\"fams\":[]},\"I212743671835\":{\"id\":\"I212743671835\",\"name\":\"David Evins\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"Virginia\",\"d\":\"Aft.\",\"dp\":\"Boyd's Creek\",\"famc\":[\"F50\"],\"fams\":[\"F49\"]},\"I212743630799\":{\"id\":\"I212743630799\",\"name\":\"Martha Nall\",\"sex\":\"M\",\"b\":\"9 Ma\",\"bp\":\"Morgan County\",\"d\":\"30 A\",\"dp\":\"Edgar\",\"famc\":[\"F55\",\"F56\",\"F58\"],\"fams\":[]},\"I212743712890\":{\"id\":\"I212743712890\",\"name\":\"Wilii. Liam O'Brissell\",\"sex\":\"F\",\"b\":\"1668\",\"bp\":\"Middlesex\",\"d\":\"1771\",\"dp\":\"Caroline\",\"famc\":[],\"fams\":[\"F79\",\"F74\"]},\"I212743712889\":{\"id\":\"I212743712889\",\"name\":\"John Stone\",\"sex\":\"M\",\"b\":\"11 J\",\"bp\":\"Rugeley\",\"d\":\"Janu\",\"dp\":\"Caroline\",\"famc\":[],\"fams\":[\"F79\"]},\"I212743624666\":{\"id\":\"I212743624666\",\"name\":\"Barbara Menard \\u00bb\",\"sex\":\"F\",\"b\":\"1743\",\"bp\":\"Lancaster\",\"d\":\"1803\",\"dp\":\"Conestoga\",\"famc\":[],\"fams\":[\"F47\"]},\"I212743616317\":{\"id\":\"I212743616317\",\"name\":\"Sarah Ann Swisher\",\"sex\":\"F\",\"b\":\"26 J\",\"bp\":\"Marion County\",\"d\":\"24 J\",\"dp\":\"California\",\"famc\":[\"F7\"],\"fams\":[]},\"I212741723886\":{\"id\":\"I212741723886\",\"name\":\"Ivan Evans Smith\",\"sex\":\"M\",\"b\":\"1889\",\"bp\":\"Edgar, Nebraska\",\"d\":\"1963\",\"dp\":\"Delta, Colorado\",\"famc\":[],\"fams\":[\"F28\"]},\"I212735163684\":{\"id\":\"I212735163684\",\"name\":\"Mary Evans\",\"sex\":\"F\",\"b\":\"15 D\",\"bp\":\"Morgan County\",\"d\":\"16 M\",\"dp\":\"Rock House\",\"famc\":[\"F18\"],\"fams\":[]},\"I212735134537\":{\"id\":\"I212735134537\",\"name\":\"James Smith\",\"sex\":\"M\",\"b\":\"\",\"bp\":\"England\",\"d\":\"\",\"dp\":\"\",\"famc\":[],\"fams\":[\"F52\"]},\"I212735163674\":{\"id\":\"I212735163674\",\"name\":\"Charles Edward Smith\",\"sex\":\"M\",\"b\":\"22 M\",\"bp\":\"Jacksonville\",\"d\":\"20 S\",\"dp\":\"Hastings\",\"famc\":[\"F29\"],\"fams\":[]},\"I212740887794\":{\"id\":\"I212740887794\",\"name\":\"Amelia Sophia Debackere\",\"sex\":\"F\",\"b\":\"2 Ju\",\"bp\":\"\",\"d\":\"31 A\",\"dp\":\"\",\"famc\":[],\"fams\":[\"F44\"]},\"I212743633834\":{\"id\":\"I212743633834\",\"name\":\"Eunice Jane Evans\",\"sex\":\"F\",\"b\":\"18 S\",\"bp\":\"Morgan County\",\"d\":\"16 A\",\"dp\":\"Oregon\",\"famc\":[\"F45\"],\"fams\":[]},\"I212743699156\":{\"id\":\"I212743699156\",\"name\":\"Edward Seymour\",\"sex\":\"M\",\"b\":\"20 S\",\"bp\":\"Person\",\"d\":\"17 A\",\"dp\":\"Morgan\",\"famc\":[\"F76\"],\"fams\":[]},\"I212743625437\":{\"id\":\"I212743625437\",\"name\":\"Ludwig Dietz\",\"sex\":\"M\",\"b\":\"1700\",\"bp\":\"Rieschweiler Parish\",\"d\":\"1769\",\"dp\":\"Plainfield\",\"famc\":[],\"fams\":[\"F97\"]},\"I212735163678\":{\"id\":\"I212735163678\",\"name\":\"William Henry Smith\",\"sex\":\"M\",\"b\":\"23 M\",\"bp\":\"Edgar\",\"d\":\"3 No\",\"dp\":\"Iola\",\"famc\":[\"F29\"],\"fams\":[]},\"I212741723924\":{\"id\":\"I212741723924\",\"name\":\"Leah Emma KETTLE\",\"sex\":\"F\",\"b\":\"6 Fe\",\"bp\":\"Ridgway\",\"d\":\"9 Ap\",\"dp\":\"Delta\",\"famc\":[],\"fams\":[\"F28\"]},\"I212733634290\":{\"id\":\"I212733634290\",\"name\":\"Jay A Kettle\",\"sex\":\"M\",\"b\":\"1903\",\"bp\":\"Colorado\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F25\"],\"fams\":[]},\"I212645831049\":{\"id\":\"I212645831049\",\"name\":\"Ivan A. Smith Jr.\",\"sex\":\"M\",\"b\":\"1920\",\"bp\":\"Colorado\",\"d\":\"1981\",\"dp\":\"Delta, Colorado\",\"famc\":[\"F28\",\"F83\"],\"fams\":[\"F8\"]},\"I212743630901\":{\"id\":\"I212743630901\",\"name\":\"Susan Evans\",\"sex\":\"F\",\"b\":\"26 M\",\"bp\":\"Morgan\",\"d\":\"21 D\",\"dp\":\"Clay Center\",\"famc\":[\"F18\",\"F55\",\"F58\"],\"fams\":[]},\"I212735163685\":{\"id\":\"I212735163685\",\"name\":\"Sarah A. \\\"Sadie\\\" Evans\",\"sex\":\"F\",\"b\":\"16 F\",\"bp\":\"Morgan\",\"d\":\"12 M\",\"dp\":\"Seattle\",\"famc\":[\"F18\"],\"fams\":[]},\"I212735163675\":{\"id\":\"I212735163675\",\"name\":\"Amy Ann Cameron\",\"sex\":\"F\",\"b\":\"6 Ja\",\"bp\":\"Illinois\",\"d\":\"11 J\",\"dp\":\"Kenesaw\",\"famc\":[\"F29\"],\"fams\":[]},\"I212743630798\":{\"id\":\"I212743630798\",\"name\":\"Martha Evans\",\"sex\":\"F\",\"b\":\"\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F56\"],\"fams\":[]},\"I212743674588\":{\"id\":\"I212743674588\",\"name\":\"Jabez Evins\",\"sex\":\"M\",\"b\":\"\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F50\"],\"fams\":[]},\"I212735019827\":{\"id\":\"I212735019827\",\"name\":\"John Ludwig Kuta\",\"sex\":\"M\",\"b\":\"1870\",\"bp\":\"Tarn\\u00f3w, Poland\",\"d\":\"1933\",\"dp\":\"Loup City, Nebraska\",\"famc\":[\"F94\"],\"fams\":[\"F86\"]},\"I212743699171\":{\"id\":\"I212743699171\",\"name\":\"Andrew Jackson Seymour\",\"sex\":\"M\",\"b\":\"9 De\",\"bp\":\"North Carolina\",\"d\":\"10 M\",\"dp\":\"Franklin\",\"famc\":[\"F76\"],\"fams\":[]},\"I212743704997\":{\"id\":\"I212743704997\",\"name\":\"Mary Anne \\u201cPolly\\u201d Seymour\",\"sex\":\"F\",\"b\":\"9 Oc\",\"bp\":\"Person County\",\"d\":\"1839\",\"dp\":\"Morgan\",\"famc\":[\"F68\"],\"fams\":[]},\"I212743704996\":{\"id\":\"I212743704996\",\"name\":\"Richardson Seymour\",\"sex\":\"M\",\"b\":\"10 J\",\"bp\":\"Person\",\"d\":\"1 Ju\",\"dp\":\"Franklin\",\"famc\":[\"F68\"],\"fams\":[]},\"I212743614753\":{\"id\":\"I212743614753\",\"name\":\"Joseph W. Swisher\",\"sex\":\"M\",\"b\":\"1803\",\"bp\":\"Monongalia, Virginia\",\"d\":\"1861\",\"dp\":\"Marion\",\"famc\":[],\"fams\":[\"F60\"]},\"I212743674586\":{\"id\":\"I212743674586\",\"name\":\"Evan Evans\",\"sex\":\"M\",\"b\":\"1723\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F50\"],\"fams\":[]},\"I212735163690\":{\"id\":\"I212735163690\",\"name\":\"George Wyman Evans\",\"sex\":\"M\",\"b\":\"14 S\",\"bp\":\"Barry\",\"d\":\"24 A\",\"dp\":\"Seattle\",\"famc\":[\"F18\"],\"fams\":[\"F11\"]},\"I212681011580\":{\"id\":\"I212681011580\",\"name\":\"Tyler Gregory Smith\",\"sex\":\"M\",\"b\":\"1985\",\"bp\":\"Montrose, Colorado\",\"d\":\"2025\",\"dp\":\"Hwy 50, Montrose\",\"famc\":[\"F2\"],\"fams\":[]},\"I212743616301\":{\"id\":\"I212743616301\",\"name\":\"Druscilla Swisher\",\"sex\":\"F\",\"b\":\"14 M\",\"bp\":\"Monongalia County\",\"d\":\"20 A\",\"dp\":\"Lyon\",\"famc\":[\"F60\"],\"fams\":[]},\"I212645831136\":{\"id\":\"I212645831136\",\"name\":\"Adam Aloysius Kuta\",\"sex\":\"M\",\"b\":\"1896\",\"bp\":\"Platte, Nebraska\",\"d\":\"1973\",\"dp\":\"Delta, Colorado\",\"famc\":[\"F86\"],\"fams\":[\"F39\"]},\"I212645831549\":{\"id\":\"I212645831549\",\"name\":\"Ivan \\\"Cy\\\" Smith\",\"sex\":\"M\",\"b\":\"1889\",\"bp\":\"Edgar, Nebraska\",\"d\":\"1963\",\"dp\":\"Delta, Colorado\",\"famc\":[\"F29\"],\"fams\":[\"F83\"]},\"I212743705328\":{\"id\":\"I212743705328\",\"name\":\"Sarah A \\\"Sadie\\\" Evans\",\"sex\":\"F\",\"b\":\"16 F\",\"bp\":\"Illinois\",\"d\":\"12 M\",\"dp\":\"Seattle\",\"famc\":[\"F59\"],\"fams\":[]},\"I212735019519\":{\"id\":\"I212735019519\",\"name\":\"Richard M Kuta\",\"sex\":\"M\",\"b\":\"abt \",\"bp\":\"Nebraska\",\"d\":\"6 Ma\",\"dp\":\"Delta\",\"famc\":[\"F39\"],\"fams\":[]},\"I212743714345\":{\"id\":\"I212743714345\",\"name\":\"Agnes Allen\",\"sex\":\"F\",\"b\":\"1707\",\"bp\":\"New Kent\",\"d\":\"1800\",\"dp\":\"Hanover\",\"famc\":[],\"fams\":[\"F100\"]},\"I212743623967\":{\"id\":\"I212743623967\",\"name\":\"Malissa Ann Phillips\",\"sex\":\"F\",\"b\":\"02 J\",\"bp\":\"Boone County\",\"d\":\"14 s\",\"dp\":\"Hominy\",\"famc\":[],\"fams\":[\"F12\"]},\"I212743699163\":{\"id\":\"I212743699163\",\"name\":\"Mary Anne Seymour\",\"sex\":\"F\",\"b\":\"09 O\",\"bp\":\"Person County\",\"d\":\"1839\",\"dp\":\"Morgan\",\"famc\":[\"F76\"],\"fams\":[]},\"I212743712886\":{\"id\":\"I212743712886\",\"name\":\"Elizabeth Ann Roberson\",\"sex\":\"F\",\"b\":\"1700\",\"bp\":\"Accomack County\",\"d\":\"1775\",\"dp\":\"Virginia\",\"famc\":[],\"fams\":[\"F73\",\"F77\"]},\"I212743616315\":{\"id\":\"I212743616315\",\"name\":\"Randolph E. Swisher\",\"sex\":\"M\",\"b\":\"25 M\",\"bp\":\"Marion\",\"d\":\"23 D\",\"dp\":\"Marion County\",\"famc\":[\"F7\"],\"fams\":[]},\"I212743632588\":{\"id\":\"I212743632588\",\"name\":\"James Evins\",\"sex\":\"M\",\"b\":\"1774\",\"bp\":\"Wayne County\",\"d\":\"2 Oc\",\"dp\":\"Morgan County\",\"famc\":[\"F49\"],\"fams\":[\"F45\"]},\"I212743624169\":{\"id\":\"I212743624169\",\"name\":\"Barbara Menard Schenk SHANK (Stoner)\",\"sex\":\"F\",\"b\":\"22 F\",\"bp\":\"Bedford County\",\"d\":\"July\",\"dp\":\"East Huntingdon\",\"famc\":[\"F47\"],\"fams\":[\"F89\"]},\"I212743631723\":{\"id\":\"I212743631723\",\"name\":\"George Wyman Evans\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"Illinois\",\"d\":\"24 A\",\"dp\":\"Seattle\",\"famc\":[\"F59\"],\"fams\":[]},\"I212645830560\":{\"id\":\"I212645830560\",\"name\":\"Jeremy Michael Smith\",\"sex\":\"M\",\"b\":\"1979\",\"bp\":\"Montrose, Colorado\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F2\"],\"fams\":[]},\"I212735019829\":{\"id\":\"I212735019829\",\"name\":\"Anna Kuta\",\"sex\":\"F\",\"b\":\"Janu\",\"bp\":\"Tarn\\u00f3w\",\"d\":\"12 N\",\"dp\":\"Columbus\",\"famc\":[],\"fams\":[\"F86\"]},\"I212735003059\":{\"id\":\"I212735003059\",\"name\":\"William McFarland Evans\",\"sex\":\"M\",\"b\":\"27 M\",\"bp\":\"Wayne County\",\"d\":\"29 F\",\"dp\":\"Pulaski\",\"famc\":[\"F90\"],\"fams\":[\"F55\"]},\"I212743706377\":{\"id\":\"I212743706377\",\"name\":\"Martin B Nosal\",\"sex\":\"M\",\"b\":\"25 S\",\"bp\":\"Tarnov\",\"d\":\"14 A\",\"dp\":\"Columbus\",\"famc\":[\"F87\"],\"fams\":[]},\"I212737746367\":{\"id\":\"I212737746367\",\"name\":\"Agnes Pulliam\",\"sex\":\"F\",\"b\":\"3 Ap\",\"bp\":\"Paris\",\"d\":\"23 J\",\"dp\":\"Morgan Co.\",\"famc\":[\"F20\"],\"fams\":[\"F68\"]},\"I212735163682\":{\"id\":\"I212735163682\",\"name\":\"Susan Evans\",\"sex\":\"F\",\"b\":\"26 M\",\"bp\":\"Morgan\",\"d\":\"21 D\",\"dp\":\"Clay Center\",\"famc\":[\"F18\"],\"fams\":[]},\"I212740886695\":{\"id\":\"I212740886695\",\"name\":\"Charles Louis Verraest\",\"sex\":\"M\",\"b\":\"1852\",\"bp\":\"Wevelgem, Belgium\",\"d\":\"1932\",\"dp\":\"Wevelgem\",\"famc\":[\"F14\"],\"fams\":[\"F80\"]},\"I212740887563\":{\"id\":\"I212740887563\",\"name\":\"Henri Louis Catteeuw\",\"sex\":\"M\",\"b\":\"3 Ma\",\"bp\":\"Wevelgem\",\"d\":\"31 A\",\"dp\":\"Wevelgem\",\"famc\":[],\"fams\":[\"F44\"]},\"I212738461489\":{\"id\":\"I212738461489\",\"name\":\"Hannah Elizabeth Branson\",\"sex\":\"F\",\"b\":\"1998\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F23\"],\"fams\":[]},\"I212743616302\":{\"id\":\"I212743616302\",\"name\":\"James William Swisher\",\"sex\":\"M\",\"b\":\"24 J\",\"bp\":\"Winfield\",\"d\":\"6 DE\",\"dp\":\"Antietam\",\"famc\":[\"F60\"],\"fams\":[]},\"I212743623337\":{\"id\":\"I212743623337\",\"name\":\"Issac Taylor\",\"sex\":\"M\",\"b\":\"25 D\",\"bp\":\"Indiana\",\"d\":\"24 D\",\"dp\":\"Leavenworth\",\"famc\":[],\"fams\":[\"F12\"]},\"I212743712892\":{\"id\":\"I212743712892\",\"name\":\"Elizabeth Stone\",\"sex\":\"F\",\"b\":\"1730\",\"bp\":\"Westmoreland County\",\"d\":\"1800\",\"dp\":\"Henry County\",\"famc\":[\"F73\"],\"fams\":[]},\"I212743616313\":{\"id\":\"I212743616313\",\"name\":\"Susan Myrtle Swisher\",\"sex\":\"F\",\"b\":\"28 M\",\"bp\":\"Palatine\",\"d\":\"11 N\",\"dp\":\"West Virginia\",\"famc\":[\"F7\"],\"fams\":[]},\"I212743633840\":{\"id\":\"I212743633840\",\"name\":\"Caroline Evans\",\"sex\":\"F\",\"b\":\"14 J\",\"bp\":\"Alabama\",\"d\":\"15 O\",\"dp\":\"Morgan County\",\"famc\":[\"F45\"],\"fams\":[]},\"I212743636644\":{\"id\":\"I212743636644\",\"name\":\"George Evins\",\"sex\":\"M\",\"b\":\"Abt \",\"bp\":\"Virginia\",\"d\":\"Abt.\",\"dp\":\"Pittsylvania County\",\"famc\":[\"F88\"],\"fams\":[\"F101\"]},\"I212743712660\":{\"id\":\"I212743712660\",\"name\":\"Richard Stone\",\"sex\":\"M\",\"b\":\"1704\",\"bp\":\"St Peters Parish\",\"d\":\"13 A\",\"dp\":\"Lunenburg\",\"famc\":[\"F73\"],\"fams\":[\"F96\"]},\"I212743714367\":{\"id\":\"I212743714367\",\"name\":\"Agnieszka Maslonka\",\"sex\":\"F\",\"b\":\"9 De\",\"bp\":\"Jodlowka\",\"d\":\"Unkn\",\"dp\":\"Tarnov or Krakow\",\"famc\":[],\"fams\":[\"F94\"]},\"I212743706379\":{\"id\":\"I212743706379\",\"name\":\"Jacob J Nosal\",\"sex\":\"M\",\"b\":\"30 A\",\"bp\":\"Duncan\",\"d\":\"2 Au\",\"dp\":\"Columbus\",\"famc\":[\"F87\"],\"fams\":[]},\"I212743616309\":{\"id\":\"I212743616309\",\"name\":\"James Jefferson Swisher\",\"sex\":\"M\",\"b\":\"2 Ma\",\"bp\":\"Fairmont\",\"d\":\"2 Au\",\"dp\":\"Barberton\",\"famc\":[\"F7\"],\"fams\":[]},\"I212743616316\":{\"id\":\"I212743616316\",\"name\":\"Clemenza Olive Swisher\",\"sex\":\"F\",\"b\":\"17 A\",\"bp\":\"Winfield\",\"d\":\"18 J\",\"dp\":\"West Virginia\",\"famc\":[\"F7\"],\"fams\":[]},\"I212680150479\":{\"id\":\"I212680150479\",\"name\":\"Grace Edna Taylor Compton\",\"sex\":\"F\",\"b\":\"1905\",\"bp\":\"Pittsburgh, PA\",\"d\":\"1984\",\"dp\":\"Delta, Colorado\",\"famc\":[\"F84\"],\"fams\":[\"F34\",\"F35\"]},\"I212743624147\":{\"id\":\"I212743624147\",\"name\":\"Anna Dietz Mercer MUSSER\",\"sex\":\"F\",\"b\":\"8 MA\",\"bp\":\"Lancaster\",\"d\":\"19 A\",\"dp\":\"Pennsville\",\"famc\":[\"F32\"],\"fams\":[\"F42\"]},\"I212743608124\":{\"id\":\"I212743608124\",\"name\":\"John Phillip KETTLE VI\",\"sex\":\"M\",\"b\":\"12 D\",\"bp\":\"Gosberton Bank\",\"d\":\"21 A\",\"dp\":\"Ridgway\",\"famc\":[\"F99\"],\"fams\":[\"F64\"]},\"I212743637021\":{\"id\":\"I212743637021\",\"name\":\"Thomas Evans\",\"sex\":\"M\",\"b\":\"1660\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[],\"fams\":[\"F98\"]},\"I212743674592\":{\"id\":\"I212743674592\",\"name\":\"Martha Evans\",\"sex\":\"F\",\"b\":\"1762\",\"bp\":\"Virginia\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F49\"],\"fams\":[]},\"I212743616319\":{\"id\":\"I212743616319\",\"name\":\"L. Robert Swisher\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"Virginia\",\"d\":\"\",\"dp\":\"\",\"famc\":[\"F7\"],\"fams\":[]},\"I212743674591\":{\"id\":\"I212743674591\",\"name\":\"Joseph Evins\",\"sex\":\"M\",\"b\":\"Abt.\",\"bp\":\"\",\"d\":\"Abt.\",\"dp\":\"Madison\",\"famc\":[\"F49\"],\"fams\":[\"F33\"]},\"I212743671841\":{\"id\":\"I212743671841\",\"name\":\"George Evins\",\"sex\":\"M\",\"b\":\"Abt \",\"bp\":\"Virginia\",\"d\":\"Abt.\",\"dp\":\"Pittsylvania County\",\"famc\":[\"F91\"],\"fams\":[\"F50\"]},\"I212743717817\":{\"id\":\"I212743717817\",\"name\":\"John Marson KETTLE IV\",\"sex\":\"M\",\"b\":\"16 J\",\"bp\":\"Newton\",\"d\":\"28 F\",\"dp\":\"Newton\",\"famc\":[],\"fams\":[\"F4\"]},\"I212743704013\":{\"id\":\"I212743704013\",\"name\":\"Henri Constant Holvoet\",\"sex\":\"M\",\"b\":\"1850\",\"bp\":\"Wevelgem, Belgium\",\"d\":\"28 J\",\"dp\":\"Belgium\",\"famc\":[],\"fams\":[\"F46\"]},\"I212743699166\":{\"id\":\"I212743699166\",\"name\":\"Richardson Seymour\",\"sex\":\"M\",\"b\":\"10 J\",\"bp\":\"Person\",\"d\":\"01 J\",\"dp\":\"Morgan\",\"famc\":[\"F76\"],\"fams\":[]},\"I212743704992\":{\"id\":\"I212743704992\",\"name\":\"Jackson Seymour\",\"sex\":\"M\",\"b\":\"9 De\",\"bp\":\"North Carolina\",\"d\":\"10 M\",\"dp\":\"Franklin\",\"famc\":[\"F68\"],\"fams\":[]},\"I212743705007\":{\"id\":\"I212743705007\",\"name\":\"Mary Evans\",\"sex\":\"F\",\"b\":\"Abt.\",\"bp\":\"Illinois\",\"d\":\"1903\",\"dp\":\"Madison Co.\",\"famc\":[\"F18\",\"F55\",\"F58\"],\"fams\":[]},\"I212735020540\":{\"id\":\"I212735020540\",\"name\":\"Michael Shane Branson\",\"sex\":\"M\",\"b\":\"22 S\",\"bp\":\"\",\"d\":\"\",\"dp\":\"\",\"famc\":[],\"fams\":[\"F23\"]},\"I212743623317\":{\"id\":\"I212743623317\",\"name\":\"Margaret Fisher\",\"sex\":\"F\",\"b\":\"abt \",\"bp\":\"Pennsylvania\",\"d\":\"\",\"dp\":\"\",\"famc\":[],\"fams\":[\"F15\"]}},\"f\":{\"F1\":{\"id\":\"F1\",\"h\":\"I212743699130\",\"w\":\"I212743699134\",\"c\":[\"I212738034389\",\"I212743699125\"],\"m\":\"05 J\"},\"F2\":{\"id\":\"F2\",\"h\":\"I212645830805\",\"w\":\"I212645830659\",\"c\":[\"I212681011251\",\"I212681011315\",\"I212645830560\",\"I212681011580\"],\"m\":\"\"},\"F3\":{\"id\":\"F3\",\"h\":\"I212645830805\",\"w\":\"I212646993515\",\"c\":[],\"m\":\"22 J\"},\"F4\":{\"id\":\"F4\",\"h\":\"I212743717817\",\"w\":\"I212743717887\",\"c\":[\"I212743717377\"],\"m\":\"\"},\"F6\":{\"id\":\"F6\",\"h\":\"I212743629147\",\"w\":\"I212743636384\",\"c\":[\"I212743628784\"],\"m\":\"\"},\"F7\":{\"id\":\"F7\",\"h\":\"I212743614628\",\"w\":\"I212743616296\",\"c\":[\"I212743616316\",\"I212743616310\",\"I212743616317\",\"I212743616315\",\"I212743616320\",\"I212743616314\",\"I212743616318\",\"I212743608108\",\"I212743616319\",\"I212743616311\",\"I212743616308\",\"I212743616309\",\"I212743616313\"],\"m\":\"30 A\"},\"F8\":{\"id\":\"F8\",\"h\":\"I212645831049\",\"w\":\"I212743720567\",\"c\":[\"I212743704329\",\"I212645830805\",\"I212740240425\",\"I212743721214\"],\"m\":\"\"},\"F9\":{\"id\":\"F9\",\"h\":\"I212730915303\",\"w\":\"I212730914875\",\"c\":[\"I212645831955\"],\"m\":\"\"},\"F10\":{\"id\":\"F10\",\"h\":\"I212735163689\",\"w\":\"I212743711290\",\"c\":[\"I212743711291\"],\"m\":\"23 J\"},\"F11\":{\"id\":\"F11\",\"h\":\"I212735163690\",\"w\":\"I212743711914\",\"c\":[],\"m\":\"ABT \"},\"F12\":{\"id\":\"F12\",\"h\":\"I212743623337\",\"w\":\"I212743623967\",\"c\":[\"I212681004063\"],\"m\":\"\"},\"F13\":{\"id\":\"F13\",\"h\":\"I212743633833\",\"w\":\"I212743632625\",\"c\":[\"I212743632597\"],\"m\":\"\"},\"F14\":{\"id\":\"F14\",\"h\":\"I212740886858\",\"w\":\"I212740886859\",\"c\":[\"I212740886695\"],\"m\":\"\"},\"F15\":{\"id\":\"F15\",\"h\":\"I212743622891\",\"w\":\"I212743623317\",\"c\":[\"I212743608121\"],\"m\":\"\"},\"F16\":{\"id\":\"F16\",\"h\":\"I212735164951\",\"w\":\"I212730915509\",\"c\":[],\"m\":\"\"},\"F18\":{\"id\":\"F18\",\"h\":\"I212735163672\",\"w\":\"I212733275395\",\"c\":[\"I212735163682\",\"I212743630901\",\"I212735163683\",\"I212730915509\",\"I212735163684\",\"I212743705006\",\"I212743705007\",\"I212735163685\",\"I212735163686\",\"I212735163687\",\"I212735163688\",\"I212735163689\",\"I212735163690\",\"I212735163692\",\"I212735163693\"],\"m\":\"11 A\"},\"F19\":{\"id\":\"F19\",\"h\":\"I212743614200\",\"w\":\"I212743614618\",\"c\":[\"I212730915268\"],\"m\":\"\"},\"F20\":{\"id\":\"F20\",\"h\":\"I212743712633\",\"w\":\"I212743712643\",\"c\":[\"I212737746367\"],\"m\":\"\"},\"F22\":{\"id\":\"F22\",\"h\":\"I212743713096\",\"w\":\"I212743712896\",\"c\":[],\"m\":\"1777\"},\"F23\":{\"id\":\"F23\",\"h\":\"I212735020540\",\"w\":\"I212681011251\",\"c\":[\"I212738461489\",\"I212738461540\",\"I212738461596\"],\"m\":\"12 J\"},\"F25\":{\"id\":\"F25\",\"h\":\"I212730943252\",\"w\":\"I212730915268\",\"c\":[\"I212680148055\",\"I212733634289\",\"I212733634290\",\"I212733634291\"],\"m\":\"3 Ju\"},\"F26\":{\"id\":\"F26\",\"h\":\"I212743623300\",\"w\":\"I212743622903\",\"c\":[\"I212743622891\"],\"m\":\"\"},\"F27\":{\"id\":\"F27\",\"h\":\"I212743628784\",\"w\":\"I212743705999\",\"c\":[\"I212735163672\"],\"m\":\"2 Ju\"},\"F28\":{\"id\":\"F28\",\"h\":\"I212741723886\",\"w\":\"I212741723924\",\"c\":[\"I212645831049\"],\"m\":\"\"},\"F29\":{\"id\":\"F29\",\"h\":\"I212645831955\",\"w\":\"I212730915509\",\"c\":[\"I212735163674\",\"I212735163675\",\"I212735163676\",\"I212735163677\",\"I212735163678\",\"I212735163679\",\"I212735163680\",\"I212735163681\",\"I212735163955\",\"I212645831549\"],\"m\":\"09 S\"},\"F32\":{\"id\":\"F32\",\"h\":\"I212743624202\",\"w\":\"I212743624181\",\"c\":[\"I212743624147\"],\"m\":\"\"},\"F33\":{\"id\":\"F33\",\"h\":\"I212743674591\",\"w\":\"I212743695092\",\"c\":[],\"m\":\"10 M\"},\"F34\":{\"id\":\"F34\",\"h\":\"I212681001989\",\"w\":\"I212680150479\",\"c\":[\"I212743720567\"],\"m\":\"20 J\"},\"F35\":{\"id\":\"F35\",\"h\":\"I212681006379\",\"w\":\"I212680150479\",\"c\":[\"I212735020344\"],\"m\":\"10 M\"},\"F36\":{\"id\":\"F36\",\"h\":\"I212743706133\",\"w\":\"I212743706105\",\"c\":[\"I212743705999\"],\"m\":\"\"},\"F37\":{\"id\":\"F37\",\"h\":\"I212743674594\",\"w\":\"I212733275395\",\"c\":[],\"m\":\"\"},\"F38\":{\"id\":\"F38\",\"h\":\"I212740240425\",\"w\":\"I212743648370\",\"c\":[\"I212743649227\",\"I212743649328\"],\"m\":\"19 A\"},\"F39\":{\"id\":\"F39\",\"h\":\"I212645831136\",\"w\":\"I212645831109\",\"c\":[\"I212735019517\",\"I212735019518\",\"I212645830960\",\"I212735019519\",\"I212735019830\"],\"m\":\"25 J\"},\"F42\":{\"id\":\"F42\",\"h\":\"I212743624129\",\"w\":\"I212743624147\",\"c\":[\"I212743622903\"],\"m\":\"\"},\"F44\":{\"id\":\"F44\",\"h\":\"I212740887563\",\"w\":\"I212740887794\",\"c\":[\"I212740887461\"],\"m\":\"\"},\"F45\":{\"id\":\"F45\",\"h\":\"I212743632588\",\"w\":\"I212743632597\",\"c\":[\"I212743633839\",\"I212743630796\",\"I212743633838\",\"I212743633837\",\"I212743633840\",\"I212743633836\",\"I212743633835\",\"I212743633834\"],\"m\":\"2 Ju\"},\"F46\":{\"id\":\"F46\",\"h\":\"I212743704013\",\"w\":\"I212743704021\",\"c\":[\"I212741723644\"],\"m\":\"09 F\"},\"F47\":{\"id\":\"F47\",\"h\":\"I212743624960\",\"w\":\"I212743624666\",\"c\":[\"I212743624169\"],\"m\":\"\"},\"F48\":{\"id\":\"F48\",\"h\":\"I212743704329\",\"w\":\"I212743721689\",\"c\":[],\"m\":\"8 Ju\"},\"F49\":{\"id\":\"F49\",\"h\":\"I212743671835\",\"w\":\"I212743674590\",\"c\":[\"I212743693164\",\"I212743674595\",\"I212743674593\",\"I212743674597\",\"I212743674592\",\"I212743674591\",\"I212743632588\",\"I212743674594\"],\"m\":\"08/1\"},\"F50\":{\"id\":\"F50\",\"h\":\"I212743671841\",\"w\":\"I212743674589\",\"c\":[\"I212743674586\",\"I212743671835\",\"I212743674587\",\"I212743674588\"],\"m\":\"\"},\"F51\":{\"id\":\"F51\",\"h\":\"I212741723429\",\"w\":\"I212740857784\",\"c\":[\"I212681009964\"],\"m\":\"22 D\"},\"F52\":{\"id\":\"F52\",\"h\":\"I212735134537\",\"w\":\"I212735134538\",\"c\":[\"I212730915421\"],\"m\":\"7 Ja\"},\"F53\":{\"id\":\"F53\",\"h\":\"I212730915421\",\"w\":\"I212735134539\",\"c\":[\"I212730915303\"],\"m\":\"\"},\"F54\":{\"id\":\"F54\",\"h\":\"I212645831955\",\"w\":\"I212680148980\",\"c\":[],\"m\":\"1867\"},\"F55\":{\"id\":\"F55\",\"h\":\"I212735003059\",\"w\":\"I212733275395\",\"c\":[\"I212743630901\",\"I212743630799\",\"I212680148980\",\"I212743630900\",\"I212743705006\",\"I212743705007\"],\"m\":\"29 A\"},\"F56\":{\"id\":\"F56\",\"h\":\"I212743630797\",\"w\":\"I212733275395\",\"c\":[\"I212743630799\",\"I212743630798\"],\"m\":\"\"},\"F57\":{\"id\":\"F57\",\"h\":\"I212730914926\",\"w\":\"I212730914958\",\"c\":[\"I212681006604\"],\"m\":\"\"},\"F58\":{\"id\":\"F58\",\"h\":\"I212743630796\",\"w\":\"I212733275395\",\"c\":[\"I212743630901\",\"I212743630799\",\"I212743630900\",\"I212743705007\"],\"m\":\"11 A\"},\"F59\":{\"id\":\"F59\",\"h\":\"I212743630796\",\"w\":\"I212743630973\",\"c\":[\"I212743630900\",\"I212743705328\",\"I212743630971\",\"I212743630972\",\"I212743705326\",\"I212743631723\",\"I212743705329\",\"I212743705327\"],\"m\":\"29 A\"},\"F60\":{\"id\":\"F60\",\"h\":\"I212743614753\",\"w\":\"I212743615027\",\"c\":[\"I212743616303\",\"I212743614628\",\"I212743616301\",\"I212743616297\",\"I212743616304\",\"I212743616305\",\"I212743616302\",\"I212743616300\",\"I212743616307\",\"I212743616306\",\"I212743616299\"],\"m\":\"\"},\"F61\":{\"id\":\"F61\",\"h\":\"I212741723644\",\"w\":\"I212743712564\",\"c\":[\"I212741723429\"],\"m\":\"\"},\"F62\":{\"id\":\"F62\",\"h\":\"I212743608108\",\"w\":\"I212743608121\",\"c\":[\"I212681001989\"],\"m\":\"\"},\"F63\":{\"id\":\"F63\",\"h\":\"I212743706169\",\"w\":\"I212743712552\",\"c\":[\"I212645831109\"],\"m\":\"\"},\"F64\":{\"id\":\"F64\",\"h\":\"I212743608124\",\"w\":\"I212743608157\",\"c\":[\"I212730943252\"],\"m\":\"\"},\"F65\":{\"id\":\"F65\",\"h\":\"I212738033800\",\"w\":\"I212733275395\",\"c\":[\"I212737744220\"],\"m\":\"\"},\"F66\":{\"id\":\"F66\",\"h\":\"I212743624262\",\"w\":\"I212743624229\",\"c\":[\"I212743624129\"],\"m\":\"\"},\"F67\":{\"id\":\"F67\",\"h\":\"I212743704100\",\"w\":\"I212743704101\",\"c\":[\"I212743704021\"],\"m\":\"25 J\"},\"F68\":{\"id\":\"F68\",\"h\":\"I212738034679\",\"w\":\"I212737746367\",\"c\":[\"I212743704995\",\"I212743705003\",\"I212743704997\",\"I212743705002\",\"I212743704994\",\"I212743705004\",\"I212743704993\",\"I212743705005\",\"I212743704996\",\"I212743705001\",\"I212743704999\",\"I212743705000\",\"I212733275395\",\"I212743704992\"],\"m\":\"1 Ap\"},\"F69\":{\"id\":\"F69\",\"h\":\"I212645830960\",\"w\":\"I212681009964\",\"c\":[\"I212645830659\"],\"m\":\"11 J\"},\"F73\":{\"id\":\"F73\",\"h\":\"I212743712780\",\"w\":\"I212743712886\",\"c\":[\"I212743712660\",\"I212743712893\",\"I212743712892\",\"I212743712896\",\"I212743712891\"],\"m\":\"1727\"},\"F74\":{\"id\":\"F74\",\"h\":\"I212743712780\",\"w\":\"I212743712890\",\"c\":[],\"m\":\"\"},\"F75\":{\"id\":\"F75\",\"h\":\"I212735017999\",\"w\":\"I212680148055\",\"c\":[],\"m\":\"25 D\"},\"F76\":{\"id\":\"F76\",\"h\":\"I212738034389\",\"w\":\"I212738034393\",\"c\":[\"I212743699165\",\"I212743699164\",\"I212743699163\",\"I212743699160\",\"I212743699167\",\"I212743699156\",\"I212743699153\",\"I212743699150\",\"I212743699166\",\"I212743699138\",\"I212743699146\",\"I212743699142\",\"I212733275395\",\"I212743699171\"],\"m\":\"01 A\"},\"F77\":{\"id\":\"F77\",\"h\":\"I212743712895\",\"w\":\"I212743712886\",\"c\":[],\"m\":\"\"},\"F79\":{\"id\":\"F79\",\"h\":\"I212743712889\",\"w\":\"I212743712890\",\"c\":[\"I212743712780\",\"I212743712888\",\"I212743712887\"],\"m\":\"10 N\"},\"F80\":{\"id\":\"F80\",\"h\":\"I212740886695\",\"w\":\"I212740887461\",\"c\":[\"I212740886457\",\"I212740887564\"],\"m\":\"18 N\"},\"F81\":{\"id\":\"F81\",\"h\":\"I212740886457\",\"w\":\"I212743712585\",\"c\":[\"I212740857784\"],\"m\":\"\"},\"F83\":{\"id\":\"F83\",\"h\":\"I212645831549\",\"w\":\"I212680148055\",\"c\":[\"I212735005097\",\"I212645831049\"],\"m\":\"18 D\"},\"F84\":{\"id\":\"F84\",\"h\":\"I212681004063\",\"w\":\"I212681006604\",\"c\":[\"I212680150479\"],\"m\":\"\"},\"F86\":{\"id\":\"F86\",\"h\":\"I212735019827\",\"w\":\"I212735019829\",\"c\":[\"I212645831136\"],\"m\":\"\"},\"F87\":{\"id\":\"F87\",\"h\":\"I212743706185\",\"w\":\"I212743706191\",\"c\":[\"I212743706169\",\"I212743706378\",\"I212743706380\",\"I212743706377\",\"I212743706379\",\"I212743706376\"],\"m\":\"1852\"},\"F88\":{\"id\":\"F88\",\"h\":\"I212743636990\",\"w\":\"\",\"c\":[\"I212743636644\",\"I212743639013\"],\"m\":\"\"},\"F89\":{\"id\":\"F89\",\"h\":\"\",\"w\":\"I212743624169\",\"c\":[\"I212743623300\"],\"m\":\"\"},\"F90\":{\"id\":\"F90\",\"h\":\"I212735004905\",\"w\":\"\",\"c\":[\"I212735003059\"],\"m\":\"\"},\"F91\":{\"id\":\"F91\",\"h\":\"I212743675924\",\"w\":\"\",\"c\":[\"I212743671841\"],\"m\":\"\"},\"F92\":{\"id\":\"F92\",\"h\":\"I212743675928\",\"w\":\"\",\"c\":[\"I212743675924\"],\"m\":\"\"},\"F93\":{\"id\":\"F93\",\"h\":\"I212743712780\",\"w\":\"\",\"c\":[\"I212743712895\"],\"m\":\"\"},\"F94\":{\"id\":\"F94\",\"h\":\"\",\"w\":\"I212743714367\",\"c\":[\"I212735019827\"],\"m\":\"\"},\"F95\":{\"id\":\"F95\",\"h\":\"I212743706250\",\"w\":\"\",\"c\":[\"I212743706191\"],\"m\":\"\"},\"F96\":{\"id\":\"F96\",\"h\":\"I212743712660\",\"w\":\"\",\"c\":[\"I212743712643\"],\"m\":\"\"},\"F97\":{\"id\":\"F97\",\"h\":\"I212743625437\",\"w\":\"\",\"c\":[\"I212743624181\"],\"m\":\"\"},\"F98\":{\"id\":\"F98\",\"h\":\"I212743637021\",\"w\":\"\",\"c\":[\"I212743636990\"],\"m\":\"\"},\"F99\":{\"id\":\"F99\",\"h\":\"I212743717377\",\"w\":\"\",\"c\":[\"I212743608124\"],\"m\":\"\"},\"F100\":{\"id\":\"F100\",\"h\":\"\",\"w\":\"I212743714345\",\"c\":[\"I212743712633\"],\"m\":\"\"},\"F101\":{\"id\":\"F101\",\"h\":\"I212743636644\",\"w\":\"\",\"c\":[\"I212743629147\"],\"m\":\"\"},\"F102\":{\"id\":\"F102\",\"h\":\"I212735163672\",\"w\":\"I2\",\"c\":[],\"m\":\"11 A\"}},\"r\":\"I212645830560\"}");

// ─── ESSENCE STATES (Bells of Memory cosmology) ───────────────────────────────
const ESSENCE_STATES = [
  { id: "none", label: "— none —", color: "#555", glyph: "" },
  { id: "precessor", label: "Precessor", color: "#b8860b", glyph: "◈" },
  { id: "vitalcestor", label: "Vitalcestor", color: "#2e8b57", glyph: "◉" },
  { id: "cestor", label: "Cestor", color: "#6a5acd", glyph: "◎" },
  { id: "celestor", label: "Celestor", color: "#4682b4", glyph: "✦" },
  { id: "voidcestor", label: "Voidcestor", color: "#8b0000", glyph: "◆" },
  { id: "void_essence", label: "Void Essence", color: "#1a1a1a", glyph: "◼" },
];

const ROOT_ID = SEED_DATA.r;

// ─── STORAGE HELPERS ──────────────────────────────────────────────────────────
const STORAGE_KEY = "smith_tree_v2";
const LORE_KEY = "smith_lore_v1";

async function loadTree() {
  try {
    const result = await window.storage.get(STORAGE_KEY);
    if (result && result.value) {
      const saved = JSON.parse(result.value);
      // Merge saved individuals over seed (seed is baseline, saved overrides + adds)
      const mergedI = { ...SEED_DATA.i, ...saved.i };
      const mergedF = { ...SEED_DATA.f, ...saved.f };
      return { i: mergedI, f: mergedF, r: ROOT_ID };
    }
  } catch (e) { /* no saved data yet */ }
  return { ...SEED_DATA };
}

async function saveTree(tree) {
  try {
    // Only save additions/edits (delta over seed)
    const deltaI = {};
    const deltaF = {};
    for (const [k, v] of Object.entries(tree.i)) {
      const seed = SEED_DATA.i[k];
      if (!seed || JSON.stringify(seed) !== JSON.stringify(v)) {
        deltaI[k] = v;
      }
    }
    for (const [k, v] of Object.entries(tree.f)) {
      const seed = SEED_DATA.f[k];
      if (!seed || JSON.stringify(seed) !== JSON.stringify(v)) {
        deltaF[k] = v;
      }
    }
    await window.storage.set(STORAGE_KEY, JSON.stringify({ i: deltaI, f: deltaF }));
  } catch (e) { console.error("Save failed:", e); }
}

async function loadLore() {
  try {
    const result = await window.storage.get(LORE_KEY);
    if (result && result.value) return JSON.parse(result.value);
  } catch (e) {}
  return {};
}

async function saveLore(lore) {
  try {
    await window.storage.set(LORE_KEY, JSON.stringify(lore));
  } catch (e) { console.error("Lore save failed:", e); }
}

// ─── TREE LAYOUT ENGINE ───────────────────────────────────────────────────────
// Left-to-right layout: older generations LEFT, newer RIGHT
// We compute generations from ROOT outward, then assign y positions within each generation

function computeLayout(tree, focusId) {
  const inds = tree.i;
  const fams = tree.f;

  // Find all ancestors of focusId up to N generations
  // Keeping this tight so tree view is readable (Navigate tab handles deep exploration)
  const MAX_ANCESTOR_GEN = 3;
  const MAX_DESC_GEN = 2;

  // BFS upward from focusId to find ancestors
  const ancestorGen = new Map(); // indId -> generation (0=focus, -1=parents, -2=grandparents...)
  const descGen = new Map();     // indId -> generation (0=focus, 1=children, 2=grandchildren...)
  
  // Ancestors (negative generation = older)
  const aQueue = [[focusId, 0]];
  const aVisited = new Set();
  while (aQueue.length) {
    const [id, gen] = aQueue.shift();
    if (aVisited.has(id)) continue;
    aVisited.add(id);
    ancestorGen.set(id, gen);
    if (gen <= -MAX_ANCESTOR_GEN) continue;
    const ind = inds[id];
    if (!ind) continue;
    for (const famcId of (ind.famc || [])) {
      const fam = fams[famcId];
      if (!fam) continue;
      if (fam.h && !aVisited.has(fam.h)) aQueue.push([fam.h, gen - 1]);
      if (fam.w && !aVisited.has(fam.w)) aQueue.push([fam.w, gen - 1]);
    }
  }

  // Descendants (positive generation = newer)
  const dQueue = [[focusId, 0]];
  const dVisited = new Set();
  while (dQueue.length) {
    const [id, gen] = dQueue.shift();
    if (dVisited.has(id)) continue;
    dVisited.add(id);
    descGen.set(id, gen);
    if (gen >= MAX_DESC_GEN) continue;
    const ind = inds[id];
    if (!ind) continue;
    for (const famsId of (ind.fams || [])) {
      const fam = fams[famsId];
      if (!fam) continue;
      // Include spouse at same generation
      const spouseId = fam.h === id ? fam.w : fam.h;
      if (spouseId && !dVisited.has(spouseId)) {
        descGen.set(spouseId, gen); // spouse same gen
      }
      for (const cId of (fam.c || [])) {
        if (!dVisited.has(cId)) dQueue.push([cId, gen + 1]);
      }
    }
  }

  // Combine: normalize so oldest gen = 0 on x axis
  const allNodes = new Map();
  let minGen = 0;
  for (const [id, gen] of ancestorGen) {
    if (gen < minGen) minGen = gen;
    allNodes.set(id, { id, col: gen });
  }
  for (const [id, gen] of descGen) {
    if (!allNodes.has(id)) allNodes.set(id, { id, col: gen });
  }

  // Shift all cols so min = 0
  const shift = -minGen;
  for (const node of allNodes.values()) {
    node.col += shift;
  }

  // Group by column
  const byCol = new Map();
  for (const node of allNodes.values()) {
    if (!byCol.has(node.col)) byCol.set(node.col, []);
    byCol.get(node.col).push(node);
  }

  // Assign y positions using a proper tree layout
  // Leaves get sequential y positions; parents are centered between their children
  const CARD_H = 80;
  const CARD_GAP = 24;
  const SLOT_H = CARD_H + CARD_GAP;

  // Sort columns from right (newest) to left (oldest) 
  const sortedCols = [...byCol.keys()].sort((a, b) => b - a);
  
  // First pass: assign y to leaf nodes (those with no children in our set)
  let leafY = 0;
  const assignedY = new Map();
  
  // Get all node ids in our set
  const nodeIds = new Set(allNodes.keys());
  
  // Find which nodes have no children in our visible set
  function getVisibleChildren(id) {
    const ind = inds[id];
    if (!ind) return [];
    const kids = [];
    for (const famsId of (ind.fams || [])) {
      const fam = fams[famsId];
      if (!fam) continue;
      for (const cId of (fam.c || [])) {
        if (nodeIds.has(cId)) kids.push(cId);
      }
    }
    return kids;
  }
  
  function getVisibleParents(id) {
    const ind = inds[id];
    if (!ind) return [];
    const parents = [];
    for (const famcId of (ind.famc || [])) {
      const fam = fams[famcId];
      if (!fam) continue;
      if (fam.h && nodeIds.has(fam.h)) parents.push(fam.h);
      if (fam.w && nodeIds.has(fam.w)) parents.push(fam.w);
    }
    return parents;
  }

  // Assign y to rightmost column first (newest gen), then work left
  for (const col of sortedCols) {
    const colNodes = byCol.get(col);
    // Sort within column by birth year for consistent ordering
    colNodes.sort((a, b) => {
      const ia = inds[a.id], ib = inds[b.id];
      return (ia?.b || '9999').localeCompare(ib?.b || '9999');
    });
    
    for (const node of colNodes) {
      if (assignedY.has(node.id)) continue;
      const kids = getVisibleChildren(node.id);
      const assignedKids = kids.filter(k => assignedY.has(k));
      
      if (assignedKids.length > 0) {
        // Center parent between its assigned children
        const ys = assignedKids.map(k => assignedY.get(k));
        const centerY = (Math.min(...ys) + Math.max(...ys)) / 2;
        assignedY.set(node.id, centerY);
      } else {
        // Leaf node: assign next sequential slot
        assignedY.set(node.id, leafY);
        leafY += SLOT_H;
      }
    }
    
    // Second pass: fill in any unassigned nodes in this column
    for (const node of colNodes) {
      if (!assignedY.has(node.id)) {
        assignedY.set(node.id, leafY);
        leafY += SLOT_H;
      }
    }
  }
  
  // Apply assigned y values
  for (const node of allNodes.values()) {
    node.y = assignedY.get(node.id) || 0;
    node.row = Math.round(node.y / SLOT_H);
  }

  // Convert to final positions
  const CARD_W = 180;
  const COL_GAP = 60;
  const nodes = [];
  for (const node of allNodes.values()) {
    node.x = node.col * (CARD_W + COL_GAP) + 20;
    nodes.push(node);
  }

  // Compute canvas size based on actual positions
  const maxCol = Math.max(...nodes.map(n => n.col));
  const maxY = Math.max(...nodes.map(n => n.y));
  const width = (maxCol + 1) * (CARD_W + COL_GAP) + 40;
  const height = maxY + CARD_H + 60;

  return { nodes, nodeMap: new Map(nodes.map(n => [n.id, n])), width, height, focusCol: shift };
}

// ─── COLORS & THEME ───────────────────────────────────────────────────────────
const C = {
  bg: "#0e0c08",
  panel: "#13110d",
  card: "#1c1810",
  cardF: "#1a1218",
  cardRoot: "#111c14",
  border: "#3a3020",
  borderF: "#3a2030",
  borderRoot: "#2a5030",
  gold: "#c8a040",
  goldLight: "#e8c060",
  text: "#e8dfc0",
  textDim: "#8a7a60",
  textMuted: "#5a5040",
  accent: "#4e8a5a",
  accentB: "#4a70a0",
  red: "#9a4040",
  ink: "#2a2418",
};

// ─── ESSENCE BADGE ────────────────────────────────────────────────────────────
function EssenceBadge({ essenceId, small }) {
  if (!essenceId || essenceId === "none") return null;
  const e = ESSENCE_STATES.find(x => x.id === essenceId);
  if (!e) return null;
  return (
    <span style={{
      background: e.color + "33",
      border: `1px solid ${e.color}88`,
      color: e.color,
      borderRadius: 4,
      padding: small ? "1px 4px" : "2px 6px",
      fontSize: small ? 9 : 11,
      fontFamily: "monospace",
      letterSpacing: 0.5,
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
    }}>
      {e.glyph} {e.label}
    </span>
  );
}

// ─── INDIVIDUAL CARD ──────────────────────────────────────────────────────────
function IndCard({ id, ind, lore, isRoot, isFocus, onClick, compact }) {
  if (!ind) return null;
  const isFemale = ind.sex === "F";
  const isDead = ind.d && ind.d.trim();
  const hasLore = lore && (lore.essence || lore.role || lore.notes);
  const bg = isRoot ? C.cardRoot : isFemale ? C.cardF : C.card;
  const border = isFocus ? `2px solid ${C.goldLight}` : isRoot ? `2px solid ${C.accent}` : isFemale ? `1px solid ${C.borderF}` : `1px solid ${C.border}`;

  return (
    <div
      onClick={() => onClick(id)}
      style={{
        background: bg,
        border,
        borderRadius: 8,
        padding: compact ? "6px 10px" : "10px 14px",
        cursor: "pointer",
        width: 176,
        boxSizing: "border-box",
        boxShadow: isFocus
          ? `0 0 20px ${C.goldLight}44, 0 4px 16px rgba(0,0,0,0.6)`
          : "0 2px 8px rgba(0,0,0,0.5)",
        transition: "box-shadow 0.15s",
        position: "relative",
        userSelect: "none",
      }}
    >
      {hasLore && (
        <div style={{
          position: "absolute", top: 4, right: 4,
          width: 6, height: 6, borderRadius: "50%",
          background: C.gold, opacity: 0.8,
        }} />
      )}
      <div style={{
        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
        fontWeight: 700,
        fontSize: compact ? 11 : 12,
        color: isRoot ? "#80c090" : isFemale ? "#c080a0" : C.text,
        lineHeight: 1.3,
        marginBottom: 3,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>
        {ind.name || "Unknown"}
      </div>
      {!compact && (
        <>
          <div style={{ fontSize: 10, color: C.textDim, lineHeight: 1.4 }}>
            {cleanDate(ind.b) ? `b. ${cleanDate(ind.b)}` : ""}
            {cleanDate(ind.b) && cleanDate(ind.d) ? "  ·  " : ""}
            {cleanDate(ind.d) ? `d. ${cleanDate(ind.d)}` : ""}
          </div>
          {ind.bp && (
            <div style={{ fontSize: 9, color: C.textMuted, fontStyle: "italic", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {ind.bp.split(",")[0]}
            </div>
          )}
          {lore?.essence && lore.essence !== "none" && (
            <div style={{ marginTop: 4 }}>
              <EssenceBadge essenceId={lore.essence} small />
            </div>
          )}
        </>
      )}
    </div>
  );
}


// ─── EDIT MODAL ──────────────────────────────────────────────────────────────
function EditModal({ id, ind, lore, onSave, onClose }) {
  const [tab, setTab] = useState("record");
  const [form, setForm] = useState({
    name: ind?.name || "",
    sex: ind?.sex || "M",
    b: ind?.b || "",
    bp: ind?.bp || "",
    d: ind?.d || "",
    dp: ind?.dp || "",
  });
  const [loreForm, setLoreForm] = useState({
    essence: lore?.essence || "none",
    role: lore?.role || "",
    title: lore?.title || "",
    affiliation: lore?.affiliation || "",
    notes: lore?.notes || "",
    novelStatus: lore?.novelStatus || "",
  });

  const handleSave = () => {
    onSave(id, form, loreForm);
    onClose();
  };

  const inputStyle = {
    width: "100%", padding: "7px 10px", borderRadius: 6,
    border: `1px solid ${C.border}`, background: C.ink,
    color: C.text, fontSize: 13, boxSizing: "border-box",
    fontFamily: "'Palatino Linotype', serif", outline: "none",
    marginBottom: 10,
  };
  const labelStyle = { color: C.textDim, fontSize: 10, marginBottom: 3, display: "block", letterSpacing: 0.8 };
  const tabBtn = (t, label) => (
    <button onClick={() => setTab(t)} style={{
      background: tab === t ? C.gold + "22" : "none",
      border: "none",
      borderBottom: tab === t ? `2px solid ${C.gold}` : `2px solid transparent`,
      color: tab === t ? C.gold : C.textMuted,
      padding: "8px 18px", cursor: "pointer", fontSize: 12,
      fontFamily: "'Palatino Linotype', serif",
    }}>{label}</button>
  );

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12,
        width: 480, maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
      }}>
        <div style={{ padding: "20px 24px 0", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontFamily: "'Palatino Linotype', serif", fontSize: 16, color: C.goldLight, fontWeight: 700 }}>
              {form.name || "Edit Person"}
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 20 }}>✕</button>
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            {tabBtn("record", "📜 Record")}
            {tabBtn("lore", "✦ Lore")}
          </div>
        </div>

        <div style={{ padding: 24 }}>
          {tab === "record" && (
            <>
              <label style={labelStyle}>FULL NAME</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>SEX</label>
                  <select style={{ ...inputStyle, marginBottom: 0 }} value={form.sex} onChange={e => setForm(f => ({ ...f, sex: e.target.value }))}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="U">Unknown</option>
                  </select>
                </div>
              </div>
              <div style={{ height: 10 }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>BIRTH DATE / YEAR</label>
                  <input style={inputStyle} placeholder="e.g. 1952" value={form.b} onChange={e => setForm(f => ({ ...f, b: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>BIRTH PLACE</label>
                  <input style={inputStyle} placeholder="City, State" value={form.bp} onChange={e => setForm(f => ({ ...f, bp: e.target.value }))} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>DEATH DATE / YEAR</label>
                  <input style={inputStyle} placeholder="leave blank if living" value={form.d} onChange={e => setForm(f => ({ ...f, d: e.target.value }))} />
                </div>
                <div>
                  <label style={labelStyle}>DEATH PLACE</label>
                  <input style={inputStyle} value={form.dp} onChange={e => setForm(f => ({ ...f, dp: e.target.value }))} />
                </div>
              </div>
            </>
          )}

          {tab === "lore" && (
            <>
              <div style={{
                background: C.gold + "11", border: `1px solid ${C.gold}33`,
                borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 11, color: C.textDim,
                fontStyle: "italic",
              }}>
                Lore fields are for your worldbuilding — Bells of Memory essence states, narrative roles, and story notes. These are layered on top of the genealogical record and never conflict with it.
              </div>

              <label style={labelStyle}>ESSENCE STATE</label>
              <select style={{ ...inputStyle }} value={loreForm.essence} onChange={e => setLoreForm(f => ({ ...f, essence: e.target.value }))}>
                {ESSENCE_STATES.map(e => (
                  <option key={e.id} value={e.id}>{e.glyph ? e.glyph + " " : ""}{e.label}</option>
                ))}
              </select>

              <label style={labelStyle}>NOVEL TITLE / HONORIFIC</label>
              <input style={inputStyle} placeholder="e.g. The Mourning Flame, Trial Bearer" value={loreForm.title} onChange={e => setLoreForm(f => ({ ...f, title: e.target.value }))} />

              <label style={labelStyle}>NARRATIVE ROLE</label>
              <input style={inputStyle} placeholder="e.g. Protagonist, Witness, Ancestor Spirit" value={loreForm.role} onChange={e => setLoreForm(f => ({ ...f, role: e.target.value }))} />

              <label style={labelStyle}>INSTITUTIONAL AFFILIATION</label>
              <input style={inputStyle} placeholder="e.g. Masiak Institution, House of Bells" value={loreForm.affiliation} onChange={e => setLoreForm(f => ({ ...f, affiliation: e.target.value }))} />

              <label style={labelStyle}>NOVEL / STORY STATUS</label>
              <input style={inputStyle} placeholder="e.g. Active in Chapter 3, Deceased by Act II" value={loreForm.novelStatus} onChange={e => setLoreForm(f => ({ ...f, novelStatus: e.target.value }))} />

              <label style={labelStyle}>WORLDBUILDING NOTES</label>
              <textarea
                style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
                placeholder="Character notes, backstory threads, connections to other characters..."
                value={loreForm.notes}
                onChange={e => setLoreForm(f => ({ ...f, notes: e.target.value }))}
              />
            </>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={onClose} style={{
              background: "none", border: `1px solid ${C.border}`, color: C.textDim,
              borderRadius: 6, padding: "8px 18px", cursor: "pointer", fontSize: 13,
            }}>Cancel</button>
            <button onClick={handleSave} style={{
              background: C.gold + "22", border: `1px solid ${C.gold}`,
              color: C.gold, borderRadius: 6, padding: "8px 18px", cursor: "pointer", fontSize: 13,
              fontFamily: "'Palatino Linotype', serif",
            }}>Save Record</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADD PERSON MODAL ─────────────────────────────────────────────────────────
function AddPersonModal({ relativeId, relativeInd, onAdd, onClose }) {
  const [relationship, setRelationship] = useState("child");
  const [form, setForm] = useState({
    name: "", sex: "M", b: "", bp: "", d: "", dp: "",
  });

  const inputStyle = {
    width: "100%", padding: "7px 10px", borderRadius: 6,
    border: `1px solid ${C.border}`, background: C.ink,
    color: C.text, fontSize: 13, boxSizing: "border-box",
    fontFamily: "'Palatino Linotype', serif", outline: "none",
    marginBottom: 10,
  };
  const labelStyle = { color: C.textDim, fontSize: 10, marginBottom: 3, display: "block", letterSpacing: 0.8 };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    onAdd(relativeId, relationship, form);
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12,
        width: 440, maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 20px 60px rgba(0,0,0,0.8)", padding: 24,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Palatino Linotype', serif", fontSize: 15, color: C.goldLight, fontWeight: 700 }}>
            Add Family Member
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>

        <div style={{ marginBottom: 16, padding: "10px 14px", background: C.ink, borderRadius: 8, fontSize: 12, color: C.textDim }}>
          Adding relative of: <span style={{ color: C.text }}>{relativeInd?.name}</span>
        </div>

        <label style={labelStyle}>RELATIONSHIP TO {(relativeInd?.name || "").split(" ")[0].toUpperCase()}</label>
        <select style={{ ...inputStyle }} value={relationship} onChange={e => setRelationship(e.target.value)}>
          <option value="child">Child</option>
          <option value="parent_father">Father (parent)</option>
          <option value="parent_mother">Mother (parent)</option>
          <option value="spouse">Spouse / Partner</option>
          <option value="sibling">Sibling</option>
        </select>

        <label style={labelStyle}>FULL NAME</label>
        <input style={inputStyle} placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={labelStyle}>SEX</label>
            <select style={{ ...inputStyle, marginBottom: 0 }} value={form.sex} onChange={e => setForm(f => ({ ...f, sex: e.target.value }))}>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="U">Unknown</option>
            </select>
          </div>
        </div>
        <div style={{ height: 10 }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={labelStyle}>BIRTH YEAR</label>
            <input style={inputStyle} placeholder="e.g. 1952" value={form.b} onChange={e => setForm(f => ({ ...f, b: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>BIRTH PLACE</label>
            <input style={inputStyle} placeholder="City, State" value={form.bp} onChange={e => setForm(f => ({ ...f, bp: e.target.value }))} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            background: "none", border: `1px solid ${C.border}`, color: C.textDim,
            borderRadius: 6, padding: "8px 18px", cursor: "pointer", fontSize: 13,
          }}>Cancel</button>
          <button onClick={handleAdd} style={{
            background: C.accent + "22", border: `1px solid ${C.accent}`,
            color: C.accent, borderRadius: 6, padding: "8px 18px", cursor: "pointer", fontSize: 13,
            fontFamily: "'Palatino Linotype', serif",
          }}>Add to Tree</button>
        </div>
      </div>
    </div>
  );
}


// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────
function DetailPanel({ id, ind, lore, tree, onNavigate, onEdit, onAdd, onClose }) {
  if (!ind) return null;
  const isFemale = ind.sex === "F";
  const isDead = ind.d && ind.d.trim();
  const isRoot = id === ROOT_ID;

  // Get parents
  let father = null, mother = null, famcId = null;
  for (const fc of (ind.famc || [])) {
    const fam = tree.f[fc];
    if (!fam) continue;
    father = fam.h ? tree.i[fam.h] : null;
    mother = fam.w ? tree.i[fam.w] : null;
    famcId = fc;
    break;
  }

  // Get spouses and children
  const families = (ind.fams || []).map(fid => {
    const fam = tree.f[fid];
    if (!fam) return null;
    const spouseId = fam.h === id ? fam.w : fam.h;
    return {
      fid,
      spouse: spouseId ? tree.i[spouseId] : null,
      spouseId,
      children: (fam.c || []).map(cid => ({ id: cid, ind: tree.i[cid] })).filter(x => x.ind),
    };
  }).filter(Boolean);

  // Siblings
  const siblings = [];
  if (famcId) {
    const fam = tree.f[famcId];
    if (fam) {
      for (const cid of (fam.c || [])) {
        if (cid !== id && tree.i[cid]) siblings.push({ id: cid, ind: tree.i[cid] });
      }
    }
  }

  const miniCard = ({ id: cid, ind: cind }, extraStyle = {}) => cind ? (
    <div key={cid} onClick={() => onNavigate(cid)} style={{
      background: C.ink, border: `1px solid ${C.border}`, borderRadius: 6,
      padding: "5px 10px", cursor: "pointer", fontSize: 11, color: C.textDim,
      display: "inline-block", marginRight: 6, marginBottom: 6,
      fontFamily: "'Palatino Linotype', serif", ...extraStyle,
    }}>
      {cind.name} {cind.b ? `(${cind.b})` : ""}
    </div>
  ) : null;

  const sectionLabel = (text) => (
    <div style={{ color: C.textMuted, fontSize: 9, letterSpacing: 1.2, marginBottom: 6, marginTop: 14, borderBottom: `1px solid ${C.border}`, paddingBottom: 4 }}>
      {text}
    </div>
  );

  return (
    <div style={{
      background: C.panel, borderLeft: `1px solid ${C.border}`,
      width: 340, flexShrink: 0, overflowY: "auto", padding: 20,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Palatino Linotype', serif", fontSize: 17, fontWeight: 700,
            color: isRoot ? "#80c090" : isFemale ? "#c080a0" : C.goldLight,
            lineHeight: 1.3, marginBottom: 4,
          }}>
            {ind.name}
          </div>
          {lore?.title && (
            <div style={{ fontSize: 11, color: C.gold, fontStyle: "italic", marginBottom: 4 }}>"{lore.title}"</div>
          )}
          {lore?.essence && lore.essence !== "none" && (
            <div style={{ marginBottom: 4 }}><EssenceBadge essenceId={lore.essence} /></div>
          )}
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 18, padding: 4, flexShrink: 0 }}>✕</button>
      </div>

      {/* Vital stats */}
      <div style={{ background: C.ink, borderRadius: 8, padding: "10px 14px", marginBottom: 4 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
          {ind.b && <>
            <div>
              <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 0.8 }}>BORN</div>
              <div style={{ fontSize: 12, color: C.text }}>{cleanDate(ind.b) || ind.b}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 0.8 }}>PLACE</div>
              <div style={{ fontSize: 12, color: C.text }}>{ind.bp || "—"}</div>
            </div>
          </>}
          {cleanDate(ind.d) && <>
            <div>
              <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 0.8 }}>DIED</div>
              <div style={{ fontSize: 12, color: C.text }}>{cleanDate(ind.d)}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 0.8 }}>PLACE</div>
              <div style={{ fontSize: 12, color: C.text }}>{ind.dp || "—"}</div>
            </div>
          </>}
        </div>
      </div>

      {/* Lore section */}
      {lore && (lore.role || lore.affiliation || lore.novelStatus || lore.notes) && (
        <>
          {sectionLabel("WORLDBUILDING LORE")}
          <div style={{ background: C.gold + "0a", border: `1px solid ${C.gold}22`, borderRadius: 8, padding: "10px 14px", marginBottom: 4 }}>
            {lore.role && <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 9, color: C.textMuted, letterSpacing: 0.8 }}>ROLE  </span>
              <span style={{ fontSize: 12, color: C.text }}>{lore.role}</span>
            </div>}
            {lore.affiliation && <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 9, color: C.textMuted, letterSpacing: 0.8 }}>AFFILIATION  </span>
              <span style={{ fontSize: 12, color: C.text }}>{lore.affiliation}</span>
            </div>}
            {lore.novelStatus && <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 9, color: C.textMuted, letterSpacing: 0.8 }}>STORY STATUS  </span>
              <span style={{ fontSize: 12, color: C.text }}>{lore.novelStatus}</span>
            </div>}
            {lore.notes && <div style={{ fontSize: 11, color: C.textDim, fontStyle: "italic", lineHeight: 1.5, marginTop: 6, borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
              {lore.notes}
            </div>}
          </div>
        </>
      )}

      {/* Parents */}
      {(father || mother) && (
        <>
          {sectionLabel("PARENTS")}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {father && miniCard({ id: tree.f[famcId].h, ind: father })}
            {mother && miniCard({ id: tree.f[famcId].w, ind: mother })}
          </div>
        </>
      )}

      {/* Siblings */}
      {siblings.length > 0 && (
        <>
          {sectionLabel(`SIBLINGS (${siblings.length})`)}
          <div>{siblings.map(s => miniCard(s))}</div>
        </>
      )}

      {/* Spouses & children */}
      {families.map(f => (
        <div key={f.fid}>
          {f.spouse && (
            <>
              {sectionLabel("SPOUSE")}
              {miniCard({ id: f.spouseId, ind: f.spouse })}
            </>
          )}
          {f.children.length > 0 && (
            <>
              {sectionLabel(`CHILDREN (${f.children.length})`)}
              <div>{f.children.map(c => miniCard(c))}</div>
            </>
          )}
        </div>
      ))}

      {/* Action buttons */}
      <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${C.border}`, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => onEdit(id)} style={{
          background: C.gold + "18", border: `1px solid ${C.gold}66`,
          color: C.gold, borderRadius: 6, padding: "7px 14px",
          cursor: "pointer", fontSize: 11, flex: 1,
          fontFamily: "'Palatino Linotype', serif",
        }}>✏ Edit Record</button>
        <button onClick={() => onAdd(id)} style={{
          background: C.accent + "18", border: `1px solid ${C.accent}66`,
          color: C.accent, borderRadius: 6, padding: "7px 14px",
          cursor: "pointer", fontSize: 11, flex: 1,
          fontFamily: "'Palatino Linotype', serif",
        }}>+ Add Relative</button>
      </div>
    </div>
  );
}


// ─── TREE CANVAS (SVG + Cards) ────────────────────────────────────────────────
function TreeCanvas({ tree, lore, focusId, onSelect }) {
  const layout = useMemo(() => computeLayout(tree, focusId), [tree, focusId]);
  const { nodes, nodeMap, width, height } = layout;

  const CARD_W = 176;
  const CARD_H = 76;

  // Build SVG connection lines
  const lines = [];
  const drawn = new Set();

  for (const node of nodes) {
    const ind = tree.i[node.id];
    if (!ind) continue;

    // Parent-child connections
    for (const famcId of (ind.famc || [])) {
      const fam = tree.f[famcId];
      if (!fam) continue;
      const childNode = nodeMap.get(node.id);
      if (!childNode) continue;

      for (const parentId of [fam.h, fam.w]) {
        if (!parentId) continue;
        const parentNode = nodeMap.get(parentId);
        if (!parentNode) continue;

        const key = `${parentId}->${node.id}`;
        if (drawn.has(key)) continue;
        drawn.add(key);

        const x1 = parentNode.x + CARD_W;
        const y1 = parentNode.y + CARD_H / 2;
        const x2 = childNode.x;
        const y2 = childNode.y + CARD_H / 2;
        const mx = (x1 + x2) / 2;

        // Determine if paternal or maternal line
        const isPaternal = parentId === "I212645830805" || tree.i[parentId]?.name?.includes("Smith");
        const strokeColor = parentNode.id === focusId || childNode.id === focusId
          ? C.gold + "cc" : C.border + "aa";

        lines.push(
          <path
            key={key}
            d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={childNode.id === focusId || parentNode.id === focusId ? 2 : 1}
            opacity={0.7}
          />
        );
      }
    }

    // Spouse connections (horizontal line between spouses)
    for (const famsId of (ind.fams || [])) {
      const fam = tree.f[famsId];
      if (!fam) continue;
      const spouseId = fam.h === node.id ? fam.w : fam.h;
      if (!spouseId) continue;
      const spouseNode = nodeMap.get(spouseId);
      if (!spouseNode) continue;

      const key = [node.id, spouseId].sort().join("=");
      if (drawn.has(key)) continue;
      drawn.add(key);

      const x1 = node.x + CARD_W / 2;
      const y1 = node.y + CARD_H;
      const x2 = spouseNode.x + CARD_W / 2;
      const y2 = spouseNode.y;

      if (Math.abs(node.col - spouseNode.col) === 0) {
        // Same column: vertical dashed line
        lines.push(
          <line key={key}
            x1={x1} y1={y1 + 4} x2={x2} y2={y2 - 4}
            stroke={C.gold + "55"} strokeWidth={1} strokeDasharray="4,3"
          />
        );
      }
    }
  }

  return (
    <div style={{ position: "relative", width, height: height + 40, minWidth: "100%" }}>
      {/* SVG lines layer */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }} width={width} height={height + 40}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {lines}
      </svg>

      {/* Card nodes */}
      {nodes.map(node => {
        const ind = tree.i[node.id];
        if (!ind) return null;
        const nodeLore = lore[node.id];
        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: node.x,
              top: node.y,
              transition: "box-shadow 0.15s",
            }}
          >
            <IndCard
              id={node.id}
              ind={ind}
              lore={nodeLore}
              isRoot={node.id === ROOT_ID}
              isFocus={node.id === focusId}
              onClick={onSelect}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── SEARCH PANEL ─────────────────────────────────────────────────────────────
function SearchPanel({ tree, lore, onSelect, onClose }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (q.length < 2) return [];
    const ql = q.toLowerCase();
    return Object.values(tree.i).filter(ind =>
      ind.name?.toLowerCase().includes(ql) ||
      ind.bp?.toLowerCase().includes(ql) ||
      ind.b?.includes(q)
    ).slice(0, 25);
  }, [q, tree]);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 900,
      display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 80,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12,
        width: 480, maxWidth: "95vw", maxHeight: "70vh",
        boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={`Search ${Object.keys(tree.i).length} individuals by name or place...`}
            style={{
              width: "100%", padding: "9px 14px", borderRadius: 8,
              border: `1px solid ${C.border}`, background: C.ink,
              color: C.text, fontSize: 14, boxSizing: "border-box",
              fontFamily: "'Palatino Linotype', serif", outline: "none",
            }}
          />
        </div>
        <div style={{ overflowY: "auto", padding: "12px 16px", flex: 1 }}>
          {results.map(ind => (
            <div key={ind.id} onClick={() => { onSelect(ind.id); onClose(); }} style={{
              padding: "8px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 4,
              background: C.ink, border: `1px solid ${C.border}`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ fontSize: 13, color: C.text, fontFamily: "'Palatino Linotype', serif" }}>{ind.name}</div>
                <div style={{ fontSize: 10, color: C.textMuted }}>
                  {ind.b ? `b. ${ind.b}` : ""} {ind.bp ? `· ${ind.bp}` : ""}
                </div>
              </div>
              {lore[ind.id]?.essence && lore[ind.id].essence !== "none" && (
                <EssenceBadge essenceId={lore[ind.id].essence} small />
              )}
            </div>
          ))}
          {q.length >= 2 && results.length === 0 && (
            <div style={{ color: C.textMuted, fontStyle: "italic", padding: "20px 0", textAlign: "center" }}>No results found</div>
          )}
          {q.length < 2 && (
            <div style={{ color: C.textMuted, fontStyle: "italic", padding: "20px 0", textAlign: "center", fontSize: 12 }}>
              Type at least 2 characters to search
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ─── NUCLEAR FAMILY NAVIGATOR ─────────────────────────────────────────────────
// One nuclear family at a time. Tree moves, camera is fixed.
// Layout:
//   ROW 0: [ Father ]  [ Mother ]          ← parents, centered
//   ROW 1: [ ←Sib ]  [Sib] [FOCUS] [Spouse] [→Sib]   ← focus row
//   ROW 2: [ Child1 ][ Child2 ][ Child3 ]  ← children, left→right by birth year
//   EDGE HANDLES: overflow nav with hover popup

// ── helpers ──────────────────────────────────────────────────────────────────
function cleanDate(raw) {
  if (!raw) return "";
  const s = String(raw).trim();
  // Already a clean year
  if (/^\d{4}$/.test(s)) return s;
  // "08 J" or "15 A" style (month abbreviation) — strip, keep nothing useful
  if (/^\d{1,2}\s+[A-Z]{1,3}$/.test(s)) return "";
  // "ABT 1850" or "BEF 1900"
  const m = s.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);
  return m ? m[1] : "";
}

function getFamily(tree, id) {
  const inds = tree.i, fams = tree.f;
  const ind = inds[id];
  if (!ind) return { parents: [], siblings: [], spouses: [], children: [] };

  // Parents + siblings
  let father = null, mother = null, siblings = [];
  for (const famcId of (ind.famc || [])) {
    const fam = fams[famcId];
    if (!fam) continue;
    father = fam.h && inds[fam.h] ? { id: fam.h, ind: inds[fam.h] } : null;
    mother = fam.w && inds[fam.w] ? { id: fam.w, ind: inds[fam.w] } : null;
    siblings = (fam.c || [])
      .filter(cId => cId !== id && inds[cId])
      .map(cId => ({ id: cId, ind: inds[cId] }))
      .sort((a, b) => (cleanDate(a.ind.b) || "9999").localeCompare(cleanDate(b.ind.b) || "9999"));
    break;
  }

  // Spouses + children
  const spouses = [];
  const children = [];
  for (const famsId of (ind.fams || [])) {
    const fam = fams[famsId];
    if (!fam) continue;
    const spouseId = fam.h === id ? fam.w : fam.h;
    if (spouseId && inds[spouseId]) spouses.push({ id: spouseId, ind: inds[spouseId] });
    for (const cId of (fam.c || [])) {
      if (inds[cId]) children.push({ id: cId, ind: inds[cId] });
    }
  }
  children.sort((a, b) => (cleanDate(a.ind.b) || "9999").localeCompare(cleanDate(b.ind.b) || "9999"));

  // Next generation: children of siblings + children of children (nieces/nephews + grandchildren)
  const nextGen = [];
  const nextGenSeen = new Set();
  // Children of siblings
  for (const sib of siblings) {
    const sibInd = inds[sib.id];
    if (!sibInd) continue;
    for (const famsId of (sibInd.fams || [])) {
      const fam = fams[famsId];
      if (!fam) continue;
      for (const cId of (fam.c || [])) {
        if (inds[cId] && !nextGenSeen.has(cId)) {
          nextGenSeen.add(cId);
          nextGen.push({ id: cId, ind: inds[cId], via: sib.id });
        }
      }
    }
  }
  // Grandchildren (children of children)
  for (const child of children) {
    const childInd = inds[child.id];
    if (!childInd) continue;
    for (const famsId of (childInd.fams || [])) {
      const fam = fams[famsId];
      if (!fam) continue;
      for (const cId of (fam.c || [])) {
        if (inds[cId] && !nextGenSeen.has(cId)) {
          nextGenSeen.add(cId);
          nextGen.push({ id: cId, ind: inds[cId], via: child.id });
        }
      }
    }
  }
  nextGen.sort((a, b) => (cleanDate(a.ind.b) || "9999").localeCompare(cleanDate(b.ind.b) || "9999"));

  const parents = [father, mother].filter(Boolean);
  return { parents, siblings, spouses, children, nextGen };
}

// ── NavCard ───────────────────────────────────────────────────────────────────
function NavCard({ id, ind, lore, role, isFocus, onClick, style = {} }) {
  if (!ind) return null;
  const isFemale = ind.sex === "F";
  const isRoot = id === ROOT_ID;
  const indLore = lore?.[id] || {};
  const essState = ESSENCE_STATES.find(e => e.id === indLore.essence);
  const bYear = cleanDate(ind.b);
  const dYear = cleanDate(ind.d);

  const borderColor = isFocus
    ? C.goldLight
    : isRoot ? C.accent
    : isFemale ? "#8a4070" : "#405878";

  const bgColor = isFocus
    ? `linear-gradient(135deg, #1e1a08 0%, #2a2010 100%)`
    : isRoot ? `linear-gradient(135deg, #0e1a10 0%, #162014 100%)`
    : isFemale ? `linear-gradient(135deg, #1a0e18 0%, #1e1220 100%)`
    : `linear-gradient(135deg, #0e1018 0%, #121420 100%)`;

  const roleLabel = { focus: "", parent: "parent", spouse: "spouse", sibling: "sibling", child: "child" };

  return (
    <div
      onClick={() => onClick(id)}
      style={{
        width: 160, minHeight: 80,
        background: bgColor,
        border: `${isFocus ? 2 : 1}px solid ${borderColor}`,
        borderRadius: 10,
        padding: "10px 13px",
        cursor: isFocus ? "default" : "pointer",
        boxShadow: isFocus
          ? `0 0 24px ${C.goldLight}44, 0 6px 20px rgba(0,0,0,0.7)`
          : `0 3px 12px rgba(0,0,0,0.5)`,
        transition: "box-shadow 0.15s, border-color 0.15s",
        position: "relative",
        userSelect: "none",
        flexShrink: 0,
        ...style,
      }}
    >
      {role && !isFocus && (
        <div style={{
          position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)",
          background: C.bg, border: `1px solid ${borderColor}44`,
          borderRadius: 4, padding: "1px 6px",
          fontSize: 8, color: borderColor, letterSpacing: 0.8, whiteSpace: "nowrap",
        }}>
          {roleLabel[role] || role}
        </div>
      )}
      {isFocus && (
        <div style={{
          position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)",
          background: C.bg, border: `1px solid ${C.gold}66`,
          borderRadius: 4, padding: "1px 8px",
          fontSize: 8, color: C.gold, letterSpacing: 1,
        }}>
          FOCUS
        </div>
      )}
      <div style={{
        fontFamily: "'Palatino Linotype', serif",
        fontWeight: isFocus ? 700 : 500,
        fontSize: 12,
        color: isRoot ? "#80c090" : isFemale ? "#d090b0" : isFocus ? C.goldLight : C.text,
        lineHeight: 1.35, marginBottom: 5,
      }}>
        {ind.name || "Unknown"}
      </div>
      <div style={{ fontSize: 10, color: C.textMuted }}>
        {bYear ? `b. ${bYear}` : ""}
        {bYear && dYear ? " · " : ""}
        {dYear ? `d. ${dYear}` : ""}
      </div>
      {ind.bp && (
        <div style={{ fontSize: 9, color: C.textMuted, fontStyle: "italic", marginTop: 2 }}>
          {ind.bp.split(",")[0]}
        </div>
      )}
      {essState && essState.id !== "none" && (
        <div style={{ marginTop: 5 }}>
          <EssenceBadge essenceId={indLore.essence} small />
        </div>
      )}
    </div>
  );
}

// ── EdgeNavHandle ─────────────────────────────────────────────────────────────
function EdgeNavHandle({ direction, items, currentIdx, onNavigate, onSelectName }) {
  const [hovering, setHovering] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  if (!items || items.length === 0) return null;

  const arrows = { left: "‹", right: "›", up: "↑", down: "↓" };
  const isHoriz = direction === "left" || direction === "right";

  const handleMouseEnter = () => {
    const t = setTimeout(() => setShowPopup(true), 400);
    setHoverTimer(t);
    setHovering(true);
  };
  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    setHovering(false);
    setShowPopup(false);
  };

  const remaining = items.length;

  return (
    <div
      style={{ position: "relative", flexShrink: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={() => onNavigate(direction)}
        style={{
          width: isHoriz ? 44 : 100,
          height: isHoriz ? 80 : 44,
          background: `linear-gradient(${isHoriz ? (direction === "left" ? "to right" : "to left") : (direction === "up" ? "to bottom" : "to top")}, ${C.gold}22, transparent)`,
          border: `1px dashed ${C.gold}44`,
          borderRadius: 8,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          cursor: "pointer", gap: 2,
          transition: "background 0.15s",
        }}
      >
        <span style={{ fontSize: 18, color: C.gold, lineHeight: 1 }}>{arrows[direction]}</span>
        <span style={{ fontSize: 9, color: C.textMuted }}>{remaining}</span>
      </div>

      {/* Hover popup */}
      {showPopup && (
        <div style={{
          position: "absolute",
          ...(direction === "left" ? { left: 48, top: 0 } :
             direction === "right" ? { right: 48, top: 0 } :
             direction === "up" ? { bottom: 48, left: "50%", transform: "translateX(-50%)" } :
             { top: 48, left: "50%", transform: "translateX(-50%)" }),
          background: C.panel,
          border: `1px solid ${C.border}`,
          borderRadius: 8, padding: "8px 0",
          minWidth: 180, maxHeight: 220, overflowY: "auto",
          boxShadow: "0 8px 24px rgba(0,0,0,0.7)",
          zIndex: 200,
        }}>
          <div style={{ fontSize: 9, color: C.textMuted, padding: "0 12px 6px", letterSpacing: 0.8, borderBottom: `1px solid ${C.border}` }}>
            {remaining} more — click to focus
          </div>
          {items.map(item => (
            <div
              key={item.id}
              onClick={(e) => { e.stopPropagation(); onSelectName(item.id); setShowPopup(false); }}
              style={{
                padding: "6px 12px", cursor: "pointer", fontSize: 12,
                color: C.text, fontFamily: "'Palatino Linotype', serif",
                borderBottom: `1px solid ${C.border}22`,
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.gold + "18"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {item.ind.name}
              {cleanDate(item.ind.b) ? <span style={{ fontSize: 10, color: C.textMuted }}> ({cleanDate(item.ind.b)})</span> : ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── FamilyNavigator ────────────────────────────────────────────────────────────
// ─── FOCUSED INFORMATION PANEL ────────────────────────────────────────────────
function FocusedInfoPanel({ id, ind, lore, tree, onEdit, onAdd, onNavigate, panelOpen, setPanelOpen }) {
  if (!ind) return null;
  const isFemale = ind.sex === "F";
  const isRoot = id === ROOT_ID;
  const indLore = lore[id] || {};
  const bYear = cleanDate(ind.b);
  const dYear = cleanDate(ind.d);

  const family = useMemo(() => getFamily(tree, id), [tree, id]);
  const { parents, spouses, children, siblings } = family;

  const PANEL_W = panelOpen ? 300 : 40;

  const sectionLabel = (txt) => (
    <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1.2, marginTop: 12, marginBottom: 4 }}>{txt}</div>
  );

  const miniPill = (pid, pind) => (
    <div key={pid} onClick={() => onNavigate(pid)} style={{
      padding: "4px 10px", borderRadius: 20, cursor: "pointer",
      background: C.ink, border: `1px solid ${C.border}`,
      fontSize: 11, color: C.text, fontFamily: "'Palatino Linotype', serif",
      marginBottom: 4, transition: "border-color 0.15s",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = C.gold}
    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
    >
      {pind?.name || "Unknown"}
      {cleanDate(pind?.b) ? <span style={{ fontSize: 9, color: C.textMuted }}> {cleanDate(pind.b)}</span> : ""}
    </div>
  );

  return (
    <div style={{
      width: PANEL_W, flexShrink: 0,
      background: C.panel,
      borderLeft: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column",
      transition: "width 0.25s ease",
      position: "relative", overflow: "hidden",
      zIndex: 10,
    }}>
      {/* Toggle arrow */}
      <div
        onClick={() => setPanelOpen(o => !o)}
        style={{
          position: "absolute", top: 16, left: -1,
          width: 20, height: 48,
          background: C.panel, border: `1px solid ${C.border}`,
          borderRight: "none", borderRadius: "6px 0 0 6px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 20,
          fontSize: 11, color: C.textMuted,
          transition: "color 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.color = C.gold}
        onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
      >
        {panelOpen ? "›" : "‹"}
      </div>

      {/* Collapsed state — rotated name */}
      {!panelOpen && (
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <div style={{
            transform: "rotate(-90deg)", whiteSpace: "nowrap",
            fontSize: 11, color: C.gold,
            fontFamily: "'Palatino Linotype', serif",
            letterSpacing: 0.5,
          }}>
            {ind.name}
          </div>
        </div>
      )}

      {/* Expanded state — full info */}
      {panelOpen && (
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 80px" }}>
          {/* Name & essence */}
          <div style={{
            fontFamily: "'Palatino Linotype', serif", fontSize: 16, fontWeight: 700,
            color: isRoot ? "#80c090" : isFemale ? "#c080a0" : C.goldLight,
            lineHeight: 1.3, marginBottom: 4,
          }}>
            {ind.name}
          </div>
          {indLore.title && (
            <div style={{ fontSize: 11, color: C.gold, fontStyle: "italic", marginBottom: 6 }}>"{indLore.title}"</div>
          )}
          {indLore.essence && indLore.essence !== "none" && (
            <div style={{ marginBottom: 8 }}><EssenceBadge essenceId={indLore.essence} /></div>
          )}

          {/* Vitals */}
          <div style={{ background: C.ink, borderRadius: 8, padding: "10px 12px", marginBottom: 4 }}>
            {bYear && <div style={{ fontSize: 11, color: C.text }}>b. {bYear}{ind.bp ? ` · ${ind.bp}` : ""}</div>}
            {dYear && <div style={{ fontSize: 11, color: C.textMuted }}>d. {dYear}{ind.dp ? ` · ${ind.dp}` : ""}</div>}
            {!bYear && !dYear && <div style={{ fontSize: 10, color: C.textMuted, fontStyle: "italic" }}>No dates recorded</div>}
          </div>

          {/* Lore */}
          {(indLore.role || indLore.notes || indLore.affiliation) && (
            <>
              {sectionLabel("WORLDBUILDING")}
              <div style={{ background: C.gold + "0a", border: `1px solid ${C.gold}22`, borderRadius: 8, padding: "8px 12px" }}>
                {indLore.role && <div style={{ fontSize: 11, color: C.text, marginBottom: 4 }}>{indLore.role}</div>}
                {indLore.affiliation && <div style={{ fontSize: 10, color: C.textMuted }}>{indLore.affiliation}</div>}
                {indLore.notes && <div style={{ fontSize: 10, color: C.textDim, fontStyle: "italic", marginTop: 6, lineHeight: 1.5 }}>{indLore.notes}</div>}
              </div>
            </>
          )}

          {/* Parents */}
          {parents.length > 0 && (
            <>{sectionLabel("PARENTS")}{parents.map(p => miniPill(p.id, p.ind))}</>
          )}

          {/* Spouses */}
          {spouses.length > 0 && (
            <>{sectionLabel("SPOUSE")}{ spouses.map(s => miniPill(s.id, s.ind))}</>
          )}

          {/* Children */}
          {children.length > 0 && (
            <>{sectionLabel(`CHILDREN (${children.length})`)}{ children.map(c => miniPill(c.id, c.ind))}</>
          )}

          {/* Siblings */}
          {siblings.length > 0 && (
            <>{sectionLabel(`SIBLINGS (${siblings.length})`)}{ siblings.map(s => miniPill(s.id, s.ind))}</>
          )}

          {/* Actions */}
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            <button onClick={() => onEdit(id)} style={{
              background: C.gold + "18", border: `1px solid ${C.gold}66`,
              color: C.gold, borderRadius: 6, padding: "7px 0",
              cursor: "pointer", fontSize: 11, fontFamily: "'Palatino Linotype', serif", width: "100%",
            }}>✏ Edit Record</button>
            <button onClick={() => onAdd(id)} style={{
              background: C.accent + "18", border: `1px solid ${C.accent}66`,
              color: C.accent, borderRadius: 6, padding: "7px 0",
              cursor: "pointer", fontSize: 11, fontFamily: "'Palatino Linotype', serif", width: "100%",
            }}>⊕ Add Relative</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FAMILY NAVIGATOR (panning filmstrip) ─────────────────────────────────────
//
// Layout (always visible, responsive units):
//
//   ┌─────────────────────────────────────────────────────┐
//   │ NAV(½) │          NAV ROW — grandparents (½ height) │ NAV(½) │
//   │ NAV(½) │ ROW 1 — parents (full)                     │ NAV(½) │
//   │ NAV(½) │ ROW 2 — [FOCUS] [col2: spouse/next sib]    │ NAV(½) │
//   │ NAV(½) │ ROW 3 — children (full)                    │ NAV(½) │
//   │ NAV(½) │          NAV ROW — grandchildren (½ height) │ NAV(½) │
//   └─────────────────────────────────────────────────────┘
//
// cardW  = containerWidth  / 3   (2 full cols + 2 half NAV cols = 3 units wide)
// cardH  = containerHeight / 4   (3 full rows + 2 half NAV rows = 4 units tall)
//
// Each filmstrip row slides independently (CSS transform translateX)
// All rows slide simultaneously when focus changes, each to their correct offset.

function FamilyNavigator({ tree, lore, focusId, onSelect, onEdit, onAdd }) {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 900, h: 600 });
  const [panelOpen, setPanelOpen] = useState(true);
  const [animating, setAnimating] = useState(false);

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDims({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const PANEL_W = panelOpen ? 300 : 40;
  const treeW = dims.w - PANEL_W;
  const treeH = dims.h;

  // Responsive card dimensions
  // Horizontal: 2 NAV half-cols + 2 full cols = 3 full-col-widths visible
  // Vertical:   2 NAV half-rows + 3 full rows = 4 full-row-heights visible
  const cardW = treeW / 3;
  const cardH = treeH / 4;
  const GAP = Math.max(8, cardW * 0.04); // 4% of card width, min 8px

  // ── Build the five filmstrips ──────────────────────────────────────────────
  // Each strip is an array of person entries at their column positions.
  // The canvas for each strip is wide enough to hold all people in that generation.
  // We translate each strip so the focus-relevant person is at x = cardW * 0.5
  // (the left NAV col is half a card, so col 1 starts at cardW * 0.5)

  const focusInd = tree.i[focusId];
  const family = useMemo(() => getFamily(tree, focusId), [tree, focusId]);
  const { parents, siblings, spouses, children, nextGen } = family;

  // ── Generation strips ──────────────────────────────────────────────────────
  // For the focus generation (row 2), build: [...siblings, focus+spouse, ...] in birth order
  // Each entry: { id, ind, role }
  // Spouse sits immediately to the right of their partner

  const buildFocusStrip = () => {
    // All people in focus generation: siblings + focus, sorted by birth year
    const all = [...siblings, { id: focusId, ind: focusInd, role: "focus" }]
      .sort((a, b) => (cleanDate(a.ind?.b) || "9999").localeCompare(cleanDate(b.ind?.b) || "9999"));

    const strip = [];
    for (const item of all) {
      const isFocus = item.id === focusId;
      strip.push({ id: item.id, ind: item.ind, role: isFocus ? "focus" : "sibling" });
      // Insert spouse(s) immediately to the right
      if (isFocus) {
        if (spouses.length === 0) {
          strip.push({ id: "__add_spouse__", ind: null, role: "add_spouse" });
        } else {
          for (const sp of spouses) {
            strip.push({ id: sp.id, ind: sp.ind, role: "spouse" });
          }
        }
      } else {
        // Show siblings' spouses too
        const sibInd = tree.i[item.id];
        if (sibInd) {
          for (const famId of (sibInd.fams || [])) {
            const fam = tree.f[famId];
            if (!fam) continue;
            const spId = fam.h === item.id ? fam.w : fam.h;
            if (spId && tree.i[spId]) {
              strip.push({ id: spId, ind: tree.i[spId], role: "sib_spouse" });
            }
          }
        }
      }
    }
    return strip;
  };

  const buildParentsStrip = () => {
    // Parents of focus person — and ideally all their siblings in that generation
    // For now: show focus's parents + their siblings (aunts/uncles)
    if (parents.length === 0) return [
      { id: "__add_father__", ind: null, role: "add_parent" },
      { id: "__add_mother__", ind: null, role: "add_parent" },
    ];
    // Build a strip of the parents' generation
    const strip = [];
    const seen = new Set();
    for (const p of parents) {
      const pInd = tree.i[p.id];
      if (!pInd) continue;
      // Find parent's siblings via their famc
      for (const famcId of (pInd.famc || [])) {
        const fam = tree.f[famcId];
        if (!fam) continue;
        for (const cId of (fam.c || [])) {
          if (!seen.has(cId) && tree.i[cId]) {
            seen.add(cId);
            strip.push({ id: cId, ind: tree.i[cId], role: cId === p.id ? "parent" : "parent_sib" });
          }
        }
      }
      if (!seen.has(p.id)) {
        seen.add(p.id);
        strip.push({ id: p.id, ind: p.ind, role: "parent" });
      }
      // Spouse of parent
      for (const famId of (pInd.fams || [])) {
        const fam = tree.f[famId];
        if (!fam) continue;
        const spId = fam.h === p.id ? fam.w : fam.h;
        if (spId && tree.i[spId] && !seen.has(spId)) {
          seen.add(spId);
          strip.push({ id: spId, ind: tree.i[spId], role: "parent_spouse" });
        }
      }
    }
    strip.sort((a, b) => (cleanDate(a.ind?.b) || "9999").localeCompare(cleanDate(b.ind?.b) || "9999"));
    return strip.length ? strip : [
      { id: "__add_father__", ind: null, role: "add_parent" },
      { id: "__add_mother__", ind: null, role: "add_parent" },
    ];
  };

  const buildChildrenStrip = () => {
    if (children.length === 0) return [{ id: "__add_child__", ind: null, role: "add_child" }];
    const strip = [];
    for (const c of children) {
      strip.push({ id: c.id, ind: c.ind, role: "child" });
      // Child's spouse
      const cInd = tree.i[c.id];
      if (cInd) {
        for (const famId of (cInd.fams || [])) {
          const fam = tree.f[famId];
          if (!fam) continue;
          const spId = fam.h === c.id ? fam.w : fam.h;
          if (spId && tree.i[spId]) {
            strip.push({ id: spId, ind: tree.i[spId], role: "child_spouse" });
          }
        }
      }
    }
    return strip;
  };

  const buildGrandparentsStrip = () => {
    const gps = [];
    const seen = new Set();
    for (const p of parents) {
      const pInd = tree.i[p.id];
      if (!pInd) continue;
      for (const famcId of (pInd.famc || [])) {
        const fam = tree.f[famcId];
        if (!fam) continue;
        if (fam.h && tree.i[fam.h] && !seen.has(fam.h)) {
          seen.add(fam.h); gps.push({ id: fam.h, ind: tree.i[fam.h], role: "grandparent" });
        }
        if (fam.w && tree.i[fam.w] && !seen.has(fam.w)) {
          seen.add(fam.w); gps.push({ id: fam.w, ind: tree.i[fam.w], role: "grandparent" });
        }
      }
    }
    return gps.length ? gps : [];
  };

  const buildGrandchildrenStrip = () => {
    const gcs = [];
    const seen = new Set();
    for (const c of children) {
      const cInd = tree.i[c.id];
      if (!cInd) continue;
      for (const famId of (cInd.fams || [])) {
        const fam = tree.f[famId];
        if (!fam) continue;
        for (const gcId of (fam.c || [])) {
          if (tree.i[gcId] && !seen.has(gcId)) {
            seen.add(gcId);
            gcs.push({ id: gcId, ind: tree.i[gcId], role: "grandchild" });
          }
        }
      }
    }
    return gcs;
  };

  const focusStrip     = useMemo(() => buildFocusStrip(),       [focusId, tree, siblings, spouses]);
  const parentsStrip   = useMemo(() => buildParentsStrip(),     [focusId, tree, parents]);
  const childrenStrip  = useMemo(() => buildChildrenStrip(),    [focusId, tree, children]);
  const gpsStrip       = useMemo(() => buildGrandparentsStrip(),[focusId, tree, parents]);
  const gcsStrip       = useMemo(() => buildGrandchildrenStrip(),[focusId, tree, children]);

  // ── Compute translateX for each strip ─────────────────────────────────────
  // The focus card should always land at x = cardW * 0.5 (start of col 1)
  // So: translateX = cardW * 0.5 - focusCard.x
  // Where focusCard.x = focusIndex * cardW (each card is cardW wide including gap)

  const getStripOffset = (strip, anchorId) => {
    const idx = strip.findIndex(s => s.id === anchorId);
    if (idx < 0) return cardW * 0.5;
    return cardW * 0.5 - idx * cardW;
  };

  // For parents strip, anchor to the focus's father (first parent in sorted strip)
  const parentAnchorId = parents[0]?.id || "__add_father__";
  const childAnchorId  = children[0]?.id || "__add_child__";
  const gpAnchorId     = gpsStrip[0]?.id;
  const gcAnchorId     = gcsStrip[0]?.id;

  const focusOffset    = getStripOffset(focusStrip, focusId);
  const parentOffset   = getStripOffset(parentsStrip, parentAnchorId);
  const childOffset    = getStripOffset(childrenStrip, childAnchorId);
  const gpOffset       = gpAnchorId ? getStripOffset(gpsStrip, gpAnchorId) : cardW * 0.5;
  const gcOffset       = gcAnchorId ? getStripOffset(gcsStrip, gcAnchorId) : cardW * 0.5;

  // ── Card renderer ──────────────────────────────────────────────────────────
  const TRANSITION = "transform 0.3s cubic-bezier(0.4,0,0.2,1)";

  const renderCard = (entry, stripTranslateX, yPos, rowH) => {
    const { id, ind, role } = entry;
    const idx = 0; // position handled by parent strip
    const isFocus = id === focusId;
    const isFemale = ind?.sex === "F";
    const isRoot = id === ROOT_ID;
    const indLore = lore?.[id] || {};
    const essState = ESSENCE_STATES.find(e => e.id === indLore.essence);
    const bYear = cleanDate(ind?.b);
    const dYear = cleanDate(ind?.d);

    const isAddCard = id.startsWith("__add_");
    const addLabel = id === "__add_spouse__" ? "add spouse"
      : id === "__add_father__" ? "add father"
      : id === "__add_mother__" ? "add mother"
      : id === "__add_child__" ? "add child" : "add";

    const borderColor = isFocus ? C.goldLight
      : isRoot ? C.accent
      : role === "parent" ? C.gold + "cc"
      : role === "child" ? C.accent + "cc"
      : isFemale ? "#8a4070" : "#405878";

    const bg = isFocus
      ? `linear-gradient(135deg, #1e1a08, #2a2010)`
      : isRoot ? `linear-gradient(135deg, #0e1a10, #162014)`
      : isFemale ? `linear-gradient(135deg, #1a0e18, #1e1220)`
      : `linear-gradient(135deg, #0e1018, #121420)`;

    const padX = GAP;
    const padY = GAP;
    const w = cardW - GAP * 2;
    const h = rowH - GAP * 2;

    if (isAddCard) return (
      <div
        key={id}
        onClick={() => onAdd(focusId)}
        style={{
          width: w, height: h,
          border: `1px dashed ${C.border}66`, borderRadius: 12,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 6,
          cursor: "pointer", transition: "border-color 0.15s, background 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = C.gold + "0a"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border + "66"; e.currentTarget.style.background = "transparent"; }}
      >
        <span style={{ fontSize: 28, color: C.gold + "77", lineHeight: 1 }}>⊕</span>
        <span style={{ fontSize: 9, color: C.textMuted + "88", fontStyle: "italic" }}>{addLabel}</span>
      </div>
    );

    return (
      <div
        key={id}
        onClick={() => id !== focusId && onSelect(id)}
        style={{
          width: w, height: h,
          background: bg,
          border: `${isFocus ? 2 : 1}px solid ${borderColor}`,
          borderRadius: 12,
          padding: `${Math.max(8, h * 0.1)}px ${Math.max(10, w * 0.08)}px`,
          cursor: isFocus ? "default" : "pointer",
          boxShadow: isFocus
            ? `0 0 28px ${C.goldLight}33, 0 6px 20px rgba(0,0,0,0.7)`
            : `0 3px 12px rgba(0,0,0,0.5)`,
          position: "relative", userSelect: "none",
          overflow: "hidden",
          transition: "box-shadow 0.15s",
        }}
        onMouseEnter={e => { if (id !== focusId) e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.7), 0 0 0 1px ${borderColor}`; }}
        onMouseLeave={e => { if (id !== focusId) e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.5)"; }}
      >
        {isFocus && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: 2, background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`,
          }} />
        )}
        <div style={{
          fontFamily: "'Palatino Linotype', serif",
          fontWeight: isFocus ? 700 : 500,
          fontSize: Math.max(10, Math.min(14, w * 0.08)),
          color: isRoot ? "#80c090" : isFemale ? "#d090b0" : isFocus ? C.goldLight : C.text,
          lineHeight: 1.3, marginBottom: 4,
          overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {ind?.name || "Unknown"}
        </div>
        {(bYear || dYear) && (
          <div style={{ fontSize: Math.max(9, Math.min(11, w * 0.065)), color: C.textMuted }}>
            {bYear ? `b. ${bYear}` : ""}
            {bYear && dYear ? " · " : ""}
            {dYear ? `d. ${dYear}` : ""}
          </div>
        )}
        {ind?.bp && (
          <div style={{ fontSize: Math.max(8, Math.min(10, w * 0.06)), color: C.textMuted, fontStyle: "italic", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {ind.bp.split(",")[0]}
          </div>
        )}
        {essState && essState.id !== "none" && (
          <div style={{ marginTop: 6 }}><EssenceBadge essenceId={indLore.essence} small /></div>
        )}
      </div>
    );
  };

  // ── Filmstrip renderer ─────────────────────────────────────────────────────
  // Each strip is positioned absolutely within the tree area.
  // Cards are laid out horizontally, translateX shifts the whole strip.

  const renderStrip = (strip, translateX, yTop, rowH, opacity = 1) => (
    <div style={{
      position: "absolute",
      top: yTop, left: 0,
      width: "100%", height: rowH,
      overflow: "hidden",
      opacity,
    }}>
      {/* The moving filmstrip */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        display: "flex", flexDirection: "row",
        transform: `translateX(${translateX}px)`,
        transition: TRANSITION,
        willChange: "transform",
      }}>
        {strip.map((entry, i) => (
          <div key={entry.id} style={{
            width: cardW, height: rowH,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            {renderCard(entry, translateX, yTop, rowH)}
          </div>
        ))}
      </div>

      {/* Left NAV fade overlay */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: cardW * 0.5, height: "100%",
        background: `linear-gradient(to right, ${C.bg}ee, transparent)`,
        pointerEvents: "none",
      }} />
      {/* Right NAV fade overlay */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: cardW * 0.5, height: "100%",
        background: `linear-gradient(to left, ${C.bg}ee, transparent)`,
        pointerEvents: "none",
      }} />
    </div>
  );

  // ── Row Y positions ────────────────────────────────────────────────────────
  // cardH = treeH / 4
  // NAV top:    y=0,          h=cardH*0.5
  // ROW 1 parents: y=cardH*0.5,  h=cardH
  // ROW 2 focus:   y=cardH*1.5,  h=cardH
  // ROW 3 children:y=cardH*2.5,  h=cardH
  // NAV bottom: y=cardH*3.5,  h=cardH*0.5

  const yGP       = 0;
  const yParents  = cardH * 0.5;
  const yFocus    = cardH * 1.5;
  const yChildren = cardH * 2.5;
  const yGC       = cardH * 3.5;

  const hNAV      = cardH * 0.5;
  const hFull     = cardH;

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {/* Tree canvas area */}
      <div ref={containerRef} style={{ flex: 1, position: "relative", overflow: "hidden", background: C.bg }}>

        {/* Row divider lines */}
        {[yParents, yFocus, yChildren].map((y, i) => (
          <div key={i} style={{
            position: "absolute", top: y, left: 0, right: 0,
            height: 1, background: C.border + "33",
            pointerEvents: "none", zIndex: 1,
          }} />
        ))}

        {/* Row labels */}
        {[
          { y: yGP + 4,       label: "GRANDPARENTS" },
          { y: yParents + 4,  label: "PARENTS" },
          { y: yFocus + 4,    label: "YOUR GENERATION" },
          { y: yChildren + 4, label: "CHILDREN" },
          { y: yGC + 4,       label: "GRANDCHILDREN" },
        ].map(({ y, label }) => (
          <div key={label} style={{
            position: "absolute", top: y, left: cardW * 0.5 + 8,
            fontSize: 8, color: C.textMuted + "66", letterSpacing: 1.2,
            pointerEvents: "none", zIndex: 2,
          }}>{label}</div>
        ))}

        {/* Filmstrips */}
        {gpsStrip.length > 0 && renderStrip(gpsStrip, gpOffset, yGP, hNAV, 0.6)}
        {renderStrip(parentsStrip, parentOffset, yParents, hFull)}
        {renderStrip(focusStrip, focusOffset, yFocus, hFull)}
        {renderStrip(childrenStrip, childOffset, yChildren, hFull)}
        {gcsStrip.length > 0 && renderStrip(gcsStrip, gcOffset, yGC, hNAV, 0.6)}

        {/* Focus position indicator — vertical gold line at col 1 left edge */}
        <div style={{
          position: "absolute", top: yFocus, left: cardW * 0.5,
          width: 2, height: hFull,
          background: `linear-gradient(to bottom, transparent, ${C.gold}44, transparent)`,
          pointerEvents: "none", zIndex: 5,
        }} />

        {/* Down arrow under focus card (when children exist) */}
        {children.length > 0 && (
          <div style={{
            position: "absolute",
            top: yFocus + hFull - 4,
            left: cardW * 0.5 + cardW / 2 - 8,
            fontSize: 13, color: C.gold + "99",
            pointerEvents: "none", zIndex: 5,
          }}>▾</div>
        )}
      </div>

      {/* Focused Information Panel */}
      <FocusedInfoPanel
        id={focusId}
        ind={focusInd}
        lore={lore}
        tree={tree}
        onEdit={onEdit}
        onAdd={onAdd}
        onNavigate={onSelect}
        panelOpen={panelOpen}
        setPanelOpen={setPanelOpen}
      />
    </div>
  );
}


// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tree, setTree] = useState(null);
  const [lore, setLore] = useState({});
  const [focusId, setFocusId] = useState(ROOT_ID);
  const [selectedId, setSelectedId] = useState(ROOT_ID);
  const [editId, setEditId] = useState(null);
  const [addRelativeId, setAddRelativeId] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [history, setHistory] = useState([ROOT_ID]);
  const [histIdx, setHistIdx] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [mainView, setMainView] = useState("navigate"); // "tree" | "outline"
  const canvasRef = useRef(null);

  // Load data on mount
  useEffect(() => {
    (async () => {
      const [t, l] = await Promise.all([loadTree(), loadLore()]);
      setTree(t);
      setLore(l);
    })();
  }, []);

  const navigate = useCallback((id) => {
    if (!id) return;
    setFocusId(id);
    setSelectedId(id);
    setHistory(prev => {
      const trimmed = prev.slice(0, histIdx + 1);
      trimmed.push(id);
      setHistIdx(trimmed.length - 1);
      return trimmed;
    });
    // Scroll canvas to show the focused card
    setTimeout(() => {
      const el = canvasRef.current?.querySelector(`[data-id="${id}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }, 100);
  }, [histIdx]);

  const goBack = () => {
    if (histIdx > 0) {
      const ni = histIdx - 1;
      setHistIdx(ni);
      setFocusId(history[ni]);
      setSelectedId(history[ni]);
    }
  };
  const goForward = () => {
    if (histIdx < history.length - 1) {
      const ni = histIdx + 1;
      setHistIdx(ni);
      setFocusId(history[ni]);
      setSelectedId(history[ni]);
    }
  };

  // Save edits
  const handleSaveEdit = useCallback(async (id, formData, loreData) => {
    setSaving(true);
    const newTree = {
      ...tree,
      i: { ...tree.i, [id]: { ...tree.i[id], ...formData } },
    };
    const newLore = { ...lore, [id]: loreData };
    setTree(newTree);
    setLore(newLore);
    await Promise.all([saveTree(newTree), saveLore(newLore)]);
    setSaving(false);
    setSaveMsg("Saved ✓");
    setTimeout(() => setSaveMsg(""), 2000);
  }, [tree, lore]);

  // Add new person
  const handleAddPerson = useCallback(async (relativeId, relationship, formData) => {
    setSaving(true);
    const newId = "NEW_" + Date.now();
    const newInd = { id: newId, ...formData, famc: [], fams: [] };
    const relInd = tree.i[relativeId];
    if (!relInd) return;

    const newTree = { ...tree, i: { ...tree.i, [newId]: newInd }, f: { ...tree.f } };

    if (relationship === "child") {
      // Find or create a family where relativeId is a parent
      let famId = (relInd.fams || [])[0];
      if (!famId) {
        famId = "FAM_" + Date.now();
        const isFemale = relInd.sex === "F";
        newTree.f[famId] = { id: famId, h: isFemale ? "" : relativeId, w: isFemale ? relativeId : "", c: [] };
        newTree.i[relativeId] = { ...relInd, fams: [...(relInd.fams || []), famId] };
      }
      newTree.f[famId] = { ...newTree.f[famId], c: [...(newTree.f[famId].c || []), newId] };
      newTree.i[newId] = { ...newInd, famc: [famId] };

    } else if (relationship === "parent_father" || relationship === "parent_mother") {
      let famcId = (relInd.famc || [])[0];
      if (!famcId) {
        famcId = "FAM_" + Date.now();
        newTree.f[famcId] = { id: famcId, h: "", w: "", c: [relativeId] };
        newTree.i[relativeId] = { ...relInd, famc: [...(relInd.famc || []), famcId] };
      }
      if (relationship === "parent_father") {
        newTree.f[famcId] = { ...newTree.f[famcId], h: newId };
      } else {
        newTree.f[famcId] = { ...newTree.f[famcId], w: newId };
      }

    } else if (relationship === "spouse") {
      const famId = "FAM_" + Date.now();
      const isFemale = formData.sex === "F";
      newTree.f[famId] = {
        id: famId,
        h: isFemale ? relativeId : newId,
        w: isFemale ? newId : relativeId,
        c: []
      };
      newTree.i[relativeId] = { ...relInd, fams: [...(relInd.fams || []), famId] };
      newTree.i[newId] = { ...newInd, fams: [famId] };

    } else if (relationship === "sibling") {
      let famcId = (relInd.famc || [])[0];
      if (!famcId) {
        famcId = "FAM_" + Date.now();
        newTree.f[famcId] = { id: famcId, h: "", w: "", c: [relativeId] };
        newTree.i[relativeId] = { ...relInd, famc: [...(relInd.famc || []), famcId] };
      }
      newTree.f[famcId] = { ...newTree.f[famcId], c: [...(newTree.f[famcId].c || []), newId] };
      newTree.i[newId] = { ...newInd, famc: [famcId] };
    }

    setTree(newTree);
    await saveTree(newTree);
    setSaving(false);
    setSaveMsg("Added ✓");
    setTimeout(() => setSaveMsg(""), 2000);
    navigate(newId);
  }, [tree, navigate]);

  if (!tree) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: C.textDim, fontFamily: "'Palatino Linotype', serif", fontSize: 14 }}>
          Loading the Smith Family Record...
        </div>
      </div>
    );
  }

  const focusInd = tree.i[focusId];
  const focusLore = lore[focusId];
  const editInd = editId ? tree.i[editId] : null;
  const editLore = editId ? lore[editId] : null;
  const addRelInd = addRelativeId ? tree.i[addRelativeId] : null;

  return (
    <div style={{
      minHeight: "100vh", background: C.bg, color: C.text,
      fontFamily: "'Palatino Linotype', serif",
      display: "flex", flexDirection: "column",
      backgroundImage: "radial-gradient(ellipse at 30% 20%, #1a1508 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, #081015 0%, transparent 60%)",
    }}>
      {/* ── HEADER ── */}
      <div style={{
        background: C.panel + "ee",
        borderBottom: `1px solid ${C.border}`,
        padding: "12px 20px",
        display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
        backdropFilter: "blur(8px)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        {/* Logo / Title */}
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.gold, letterSpacing: 1.5, lineHeight: 1 }}>
            Smith Family Tree
          </div>
          <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1.2, marginTop: 2 }}>
            GENEALOGICAL RECORD & WORLDBUILDING ARCHIVE
          </div>
        </div>

        {/* Breadcrumb / current focus */}
        <div style={{
          flex: 1, minWidth: 0,
          fontSize: 12, color: C.textDim,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {focusInd ? (
            <>
              <span style={{ color: C.textMuted }}>Viewing: </span>
              <span style={{ color: C.text }}>{focusInd.name}</span>
              {focusInd.b ? <span style={{ color: C.textMuted }}> · b. {focusInd.b}</span> : ""}
              {focusLore?.essence && focusLore.essence !== "none" && (
                <span style={{ marginLeft: 8 }}><EssenceBadge essenceId={focusLore.essence} small /></span>
              )}
            </>
          ) : ""}
        </div>

        {/* Nav controls */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
          {saveMsg && <span style={{ fontSize: 11, color: C.accent }}>{saveMsg}</span>}
          {saving && <span style={{ fontSize: 11, color: C.textMuted }}>Saving…</span>}

          <button onClick={goBack} disabled={histIdx <= 0} style={headerBtn(histIdx <= 0)}>‹</button>
          <button onClick={goForward} disabled={histIdx >= history.length - 1} style={headerBtn(histIdx >= history.length - 1)}>›</button>
          <button onClick={() => navigate(ROOT_ID)} style={{ ...headerBtn(false), color: C.accent }}>⌂ Jeremy</button>

          <div style={{ width: 1, height: 18, background: C.border, margin: "0 2px" }} />
          <button
            onClick={() => setMainView("tree")}
            style={{ ...headerBtn(false), padding: "5px 12px", color: mainView === "tree" ? C.gold : C.textDim, borderColor: mainView === "tree" ? C.gold + "66" : C.border }}
          >⬡ Tree</button>
          <button
            onClick={() => setMainView("outline")}
            style={{ ...headerBtn(false), padding: "5px 12px", color: mainView === "outline" ? C.gold : C.textDim, borderColor: mainView === "outline" ? C.gold + "66" : C.border }}
          >☰ Navigate</button>
          <div style={{ width: 1, height: 18, background: C.border, margin: "0 2px" }} />

          <button onClick={() => setShowSearch(true)} style={{ ...headerBtn(false), padding: "5px 14px" }}>⌕ Search</button>
          {selectedId && (
            <button onClick={() => setEditId(selectedId)} style={{ ...headerBtn(false), color: C.gold, padding: "5px 14px" }}>✏ Edit</button>
          )}
          {selectedId && (
            <button onClick={() => setAddRelativeId(selectedId)} style={{ ...headerBtn(false), color: C.accent, padding: "5px 14px" }}>+ Add</button>
          )}
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Tree canvas area OR Outline */}
        {mainView === "tree" ? (
          <div ref={canvasRef} style={{ flex: 1, overflow: "auto", padding: 24, position: "relative" }}>
            <TreeCanvas
              tree={tree}
              lore={lore}
              focusId={focusId}
              onSelect={(id) => {
                setSelectedId(id);
                navigate(id);
              }}
            />
          </div>
        ) : (
          <FamilyNavigator
            tree={tree}
            lore={lore}
            focusId={focusId}
            onSelect={(id) => {
              setSelectedId(id);
              navigate(id);
            }}
            onEdit={(id) => setEditId(id)}
            onAdd={(id) => setAddRelativeId(id)}
          />
        )}

        {/* Detail panel */}
        {selectedId && tree.i[selectedId] && (
          <DetailPanel
            id={selectedId}
            ind={tree.i[selectedId]}
            lore={lore[selectedId] || {}}
            tree={tree}
            onNavigate={navigate}
            onEdit={(id) => setEditId(id)}
            onAdd={(id) => setAddRelativeId(id)}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>

      {/* ── MODALS ── */}
      {editId && editInd && (
        <EditModal
          id={editId}
          ind={editInd}
          lore={editLore || {}}
          onSave={handleSaveEdit}
          onClose={() => setEditId(null)}
        />
      )}

      {addRelativeId && addRelInd && (
        <AddPersonModal
          relativeId={addRelativeId}
          relativeInd={addRelInd}
          onAdd={handleAddPerson}
          onClose={() => setAddRelativeId(null)}
        />
      )}

      {showSearch && (
        <SearchPanel
          tree={tree}
          lore={lore}
          onSelect={(id) => navigate(id)}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
}

function headerBtn(disabled) {
  return {
    background: disabled ? "none" : C.ink,
    border: `1px solid ${disabled ? C.border + "44" : C.border}`,
    color: disabled ? C.textMuted + "44" : C.textDim,
    borderRadius: 6, padding: "5px 10px",
    cursor: disabled ? "default" : "pointer",
    fontSize: 13, fontFamily: "'Palatino Linotype', serif",
    transition: "all 0.15s",
  };
}

