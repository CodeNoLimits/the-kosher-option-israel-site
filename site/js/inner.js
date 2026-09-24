(() => {
  "use strict";
  const NAV = {
    he: { skip:"דלג לתוכן",home:"הבית",how:"איך זה עובד",meal:"המנה",seal:"החותם",venues:"מסעדות",families:"משפחות",kitchen:"המטבח",city:"תל אביב",menus:"תפריטים לדוגמה",books:"הספרייה",menu:"תפריט",explore:"לגלות",status:"הדמיה בלבד. אין הסכמים חתומים.",truth:"שם עבודה. פרויקט בבדיקה. אין הסכם עם יצרן או מסעדה. התמונות הן המחשה בלבד; אין כאן תעודת כשרות או ייעוץ הלכתי.",stage:"פרויקט בבדיקה",chapter:"פרק",concept:"המחשה חזותית",next:"להמשיך לגלות",open:"לקריאה",return:"בחזרה לבית",photo:"תמונה להמחשה בלבד" },
    fr: { skip:"Aller au contenu",home:"Accueil",how:"Le geste",meal:"Le plat",seal:"La confiance",venues:"Restaurants",families:"Familles",kitchen:"La cuisine",city:"Tel Aviv",menus:"Menus imaginés",books:"Livres",menu:"Menu",explore:"Explorer",status:"Visualisation conceptuelle. Aucun accord signé.",truth:"Nom de travail. Projet à l'étude. Aucun accord avec un producteur ou un restaurant. Les images sont des concepts ; aucun certificat ni avis halakhique n'est fourni ici.",stage:"Projet à l'étude",chapter:"Chapitre",concept:"Image conceptuelle",next:"Poursuivre",open:"Découvrir",return:"Retour à l'accueil",photo:"Image conceptuelle, pas un produit réel" },
    en: { skip:"Skip to content",home:"Home",how:"The journey",meal:"The meal",seal:"Trust",venues:"Restaurants",families:"Families",kitchen:"The kitchen",city:"Tel Aviv",menus:"Sample menus",books:"Library",menu:"Menu",explore:"Explore",status:"Concept visualisation. No signed agreements.",truth:"Working name. Project under study. No agreement with a producer or restaurant. Images are conceptual; no certificate or halakhic ruling is provided here.",stage:"Project under study",chapter:"Chapter",concept:"Concept image",next:"Continue exploring",open:"Explore",return:"Back to home",photo:"Concept image, not a real product" }
  };
  const PAGE = {
    geste: {
      image:"images/shared-table-concept.webp", next:"plat.html",
      he:{k:"01 / הדרך",t:"מנה אחת. שולחן אחד.",lead:"הדרך המוצעת מתחילה במטבח מפוקח ומסתיימת אצל האורח, בלי להפוך את המסעדה לכשרה.",status:"השלבים להלן הם הצעת עבודה. יצרן, משגיח ומסעדה עדיין לא אישרו נוהל ייצור, הובלה, אחסון או חימום.",
        s:[
          {k:"מהמטבח",t:"מכינים וסוגרים.",b:"המנה אמורה לצאת ממטבח בעל השגחה מתאימה כשהיא סגורה ומזוהה. לפני כל פיילוט צריך לבדוק את היצרן, את המנה עצמה, את סוג האריזה ואת נוסח האישור שמותר להציג.",d:["אין כאן תעודה חדשה מטעם המיזם.","הסרט שעל האריזה בהדמיה ריק במכוון.","בשרי, חלבי ופרווה מחייבים הפרדה ואישור פרטני."]},
          {k:"במסעדה",t:"שורה אחת, בלי לפתוח.",b:"המסעדה יכולה לשקול להוסיף אפשרות אחת לתפריט הרגיל שלה. ההגשה חייבת להיקבע בנוהל אמיתי: קבלה, טמפרטורה, אחסון, חימום מותר, זיהוי המנה והעברה לשולחן.",d:["המטבח של המסעדה אינו הופך לכשר.","כל פעולה במנה הסגורה דורשת אישור מראש.","אריזה פגומה או לא מזוהה אינה מוצגת כאפשרות מאושרת."]},
          {k:"בשולחן",t:"הבחירה נשארת אצל הסועד.",b:"האורח יכול לבדוק את האריזה ואת המידע שנמסר עליה לפני הפתיחה. שאר האנשים מזמינים מהתפריט הרגיל. האמון תלוי בפרטים המעשיים, לא רק בצילום יפה.",d:["לחם, יין, כלים ותוספות של המקום אינם נכללים אוטומטית במנה.","יש לברר עם הרב המפקח גם את אופן השירות בשבת ובחגים.","אין הזמנות פעילות דרך האתר הזה."]}
        ],q:"המסעדה נשארת היא עצמה. השולחן יכול להישאר משותף.",photo:"האריזה והסעודה מוצגות כהמחשה. אין מסעדה שותפה."},
      fr:{k:"01 / Le parcours",t:"Un plat. La même table.",lead:"Le parcours envisagé commence dans une cuisine supervisée et finit devant le convive, sans changer le statut du restaurant.",status:"Ces étapes sont un projet de protocole. Aucun producteur, superviseur ou restaurant n'a encore approuvé la production, le transport, le stockage ou le réchauffage.",
        s:[
          {k:"À la source",t:"Préparer et fermer.",b:"Le plat devrait quitter une cuisine sous supervision adaptée, fermé et identifiable. Avant un pilote, il faut vérifier le producteur, le produit précis, son emballage et les termes du certificat qu'il sera permis d'afficher.",d:["Le projet ne délivre aucun nouveau certificat.","La bande de l'emballage illustré est volontairement vierge.","Viande, lait et parve demandent des filières et validations distinctes."]},
          {k:"Dans le restaurant",t:"Une ligne, sans ouvrir.",b:"Le restaurant pourrait ajouter une option à sa carte habituelle. Un protocole réel devra régir la réception, la température, le stockage, le réchauffage autorisé, l'identification du plat et son service.",d:["La cuisine du restaurant ne devient pas cachère.","Toute intervention sur le plat fermé doit être autorisée à l'avance.","Un emballage abîmé ou non identifiable n'est pas proposé comme validé."]},
          {k:"À table",t:"Le choix reste au convive.",b:"Le convive vérifie l'emballage et les informations qui l'accompagnent avant de l'ouvrir. Le reste de la table choisit sur la carte ordinaire. La confiance dépend des gestes concrets, pas d'une belle image.",d:["Pain, vin, vaisselle et accompagnements du lieu ne sont pas automatiquement inclus.","Le service pendant le Shabbat et les fêtes doit être clarifié avec la supervision.","Ce site ne prend aucune commande."]}
        ],q:"Le restaurant garde son identité. La table peut rester commune.",photo:"L'emballage et le repas sont illustratifs. Aucun restaurant n'est partenaire."},
      en:{k:"01 / The journey",t:"One meal. One table.",lead:"The proposed journey starts in a supervised kitchen and ends with the guest, without changing the restaurant's status.",status:"These steps are a proposed workflow. No producer, supervisor or restaurant has approved production, transport, storage or reheating procedures.",
        s:[
          {k:"At the source",t:"Prepare and close.",b:"A meal would leave an appropriately supervised kitchen, closed and identifiable. Before any pilot, the producer, exact product, package and permitted certificate wording must be checked.",d:["The project issues no new certificate.","The illustrated package band is deliberately blank.","Meat, dairy and pareve require separate processes and approvals."]},
          {k:"At the restaurant",t:"One line, kept closed.",b:"A restaurant could add one option to its existing menu. A real protocol must cover receiving, temperature, storage, authorised reheating, identification and service.",d:["The restaurant kitchen does not become kosher.","Any handling of the closed meal needs prior approval.","Damaged or unidentifiable packaging is not presented as approved."]},
          {k:"At the table",t:"The guest keeps the choice.",b:"The guest checks the package and accompanying information before opening it. Everyone else orders from the regular menu. Trust rests on actual steps, not on a polished picture.",d:["The venue's bread, wine, dishes and sides are not automatically included.","Shabbat and holiday service must be clarified with the supervisor.","This site does not take orders."]}
        ],q:"The restaurant keeps its identity. The table can stay shared.",photo:"Packaging and dining scene are illustrative. No restaurant is a partner."}
    },
    plat: {
      image:"images/sealed-meal-concept.webp", next:"sceau.html",
      he:{k:"02 / המנה",t:"סגורה עד השולחן.",lead:"המנה הסגורה היא לב הרעיון. היא צריכה להיות טעימה, מזוהה ונוחה להגשה, אבל קודם כול לעמוד בדרישות שייקבעו למוצר אמיתי.",status:"התמונה היא הדמיה של אריזה אפשרית. אין מוצר מאושר, תווית אמיתית, מחיר או תפריט למכירה.",
        s:[
          {k:"עיצוב המוצר",t:"יופי אינו אישור.",b:"הדגם מציג מגש מחולק עם כיסוי וסרט נייר ריק. הצילום עוזר לבחון איך מנה יכולה להיראות בשולחן של מסעדה. הוא אינו מוכיח סגירה בלתי ניתנת לפתיחה או התאמה להלכה.",d:["תווית אמיתית תופיע רק אחרי אישור הנוסח והיצרן.","אין על הדגם סמל כשרות או שם של משגיח.","נדרש מבחן חיי מדף, טמפרטורה והגשה."]},
          {k:"פיתוח תפריט",t:"ארבעה כיוונים, לא ארבע הבטחות.",b:"בשרי, חלבי, פסטה וטבעוני הם כיווני פיתוח שונים. מנה טבעונית אינה כשרה רק מפני שהיא טבעונית, ופסטה חלבית אינה מתאימה לכל מסעדה.",d:["נדרשת בדיקה של כל מתכון ומרכיב בנפרד.","ההפרדה בין בשר לחלב נקבעת עם המטבח וההשגחה.","מחיר, זמינות ותכולה ייקבעו רק אחרי ניסוי ייצור."]}
        ],q:"האריזה מספרת סיפור. האמון יגיע מהתהליך שמאחוריה.",photo:"הדמיה של מגש סגור. הסרט ריק; אין תווית יצרן אמיתית."},
      fr:{k:"02 / Le plat",t:"Fermé jusqu'à la table.",lead:"Le plat fermé est le cœur du projet. Il doit donner envie, être identifiable et facile à servir, puis satisfaire les règles décidées pour un produit réel.",status:"L'image montre une possibilité d'emballage. Il n'existe ici ni produit approuvé, ni vraie étiquette, ni prix, ni carte à la vente.",
        s:[
          {k:"Concevoir l'objet",t:"L'esthétique ne certifie rien.",b:"Le modèle montre un plateau compartimenté, couvert et entouré d'une bande de papier vierge. L'image aide à imaginer le plat à une table de restaurant ; elle ne prouve ni l'inviolabilité du conditionnement ni sa conformité halakhique.",d:["Une vraie étiquette attendrait l'accord du producteur et la validation de sa formulation.","Aucun logo de cacheroute ou nom de superviseur n'est dessiné.","Durée de conservation, température et service demandent des essais."]},
          {k:"Développer la carte",t:"Quatre pistes, pas quatre promesses.",b:"Viande, lait, pâtes et végétal constituent des pistes de production différentes. Un plat végétalien n'est pas cachère par nature ; une pâte lactée ne convient pas à tous les établissements.",d:["Chaque recette et ingrédient demandent un contrôle propre.","La séparation viande/lait dépend de la cuisine et de sa supervision.","Prix, disponibilité et composition viendront après un test de production."]}
        ],q:"L'emballage porte l'idée. La confiance viendra du processus derrière lui.",photo:"Visualisation d'un plateau fermé. La bande est vierge, sans étiquette de fabricant."},
      en:{k:"02 / The meal",t:"Closed until the table.",lead:"The closed meal is central to the idea. It must be appealing, identifiable and easy to serve, then meet the requirements set for an actual product.",status:"The image proposes a possible package. There is no approved product, real label, price or menu item for sale here.",
        s:[
          {k:"Designing the object",t:"Beauty is not approval.",b:"The model shows a divided tray with a cover and a blank paper band. It helps imagine a meal at a restaurant table; it does not prove tamper resistance or halakhic suitability.",d:["A real label would need producer agreement and approved wording.","No kosher logo or supervisor name is drawn on the concept.","Shelf life, temperature and serving need testing."]},
          {k:"Developing a range",t:"Four directions, not four promises.",b:"Meat, dairy, pasta and plant-based meals are different development paths. A vegan dish is not automatically kosher; dairy pasta does not fit every venue.",d:["Each recipe and ingredient requires its own review.","Meat and dairy separation depends on the kitchen and supervision.","Price, availability and composition follow production trials."]}
        ],q:"The packaging carries the idea. Trust must come from the process behind it.",photo:"Visualisation of a closed tray. Its band is blank, with no real maker's label."}
    },
    sceau: {
      image:"images/sealed-meal-concept.webp", next:"restaurants.html",
      he:{k:"03 / אמון",t:"לא ממציאים חותם.",lead:"ההבחנה החשובה ביותר: אישור של מוצר מסוים אינו אישור של המסעדה שמגישה אותו.",status:"אין לפרויקט תעודת כשרות משלו. לא נבדק עדיין איזה אישור, אם בכלל, יוכל לחול על מנה מסוימת בנוהל השירות המוצע.",
        s:[
          {k:"מי מאשר",t:"רק גורם מוסמך.",b:"אם יצרן מתאים יבחר להשתתף, יש לבדוק את התעודה התקפה שלו, את תחולתה על המוצר ואת הנוסח שבו מותר לתאר אותו. תמונה של סרט נייר אינה תעודה.",d:["שם המטבח עלה כמועמד; לא נחתם הסכם.","אין להעתיק לוגו רבנות או גוף השגחה בלי הרשאה.","צרכן רשאי לבחור אם רמת ההשגחה מתאימה לו."]},
          {k:"מה נשאר לברר",t:"השרשרת כולה חשובה.",b:"ייצור הוא רק נקודת הפתיחה. הובלה, אחסון במסעדה שאינה כשרה, חימום, כלי הגשה, שבירת הסגירה ושבת מחייבים תשובה כתובה מהגורמים המתאימים לפני פיילוט.",d:["יש להגדיר מי בודק אריזה פגומה ומתי.","אוכל, לחם או יין אחרים מהמסעדה אינם מכוסים אוטומטית.","אין להציג את בית העסק כולו ככשר."]}
        ],q:"החותם לא יהיה הבטחה עיצובית. הוא יהיה עובדה שניתן לבדוק.",photo:"סרט האריזה בהדמיה ריק בכוונה. אין עליו סימן כשרות."},
      fr:{k:"03 / La confiance",t:"Ne pas inventer de sceau.",lead:"La distinction décisive : la supervision éventuelle d'un produit précis ne certifie pas le restaurant qui le sert.",status:"Le projet n'a pas de certificat propre. La portée d'un certificat sur un plat précis, dans le service envisagé, reste à établir.",
        s:[
          {k:"Qui atteste",t:"Une autorité réelle.",b:"Si un producteur participe, il faudra examiner son certificat en vigueur, vérifier qu'il couvre le produit exact et faire valider la manière de le décrire. L'image d'une bande de papier n'est pas une attestation.",d:["Une cuisine a été identifiée comme candidate ; aucun accord n'est signé.","Un logo rabbinique ou d'organisme ne peut être copié sans autorisation.","Chaque convive décide si le niveau de supervision lui convient."]},
          {k:"Ce qu'il faut trancher",t:"Toute la chaîne compte.",b:"La production n'est que le début. Livraison, stockage dans un établissement non cachère, réchauffage, vaisselle, ouverture et Shabbat demandent une réponse écrite des responsables compétents avant un pilote.",d:["Définir qui contrôle et écarte un emballage abîmé.","Les autres aliments, le pain et le vin de l'établissement ne sont pas couverts automatiquement.","Le restaurant entier ne doit jamais être présenté comme cachère."]}
        ],q:"Le sceau ne sera pas une promesse graphique. Il devra devenir un fait vérifiable.",photo:"La bande de l'image est intentionnellement vierge, sans symbole de cacheroute."},
      en:{k:"03 / Trust",t:"No invented seal.",lead:"The decisive distinction: supervision of a specific product, if established, does not certify the restaurant serving it.",status:"The project has no certificate of its own. Whether an existing certificate covers a particular meal within the proposed service remains to be established.",
        s:[
          {k:"Who attests",t:"A real authority.",b:"If a producer joins, its current certificate must be examined, checked against the exact product and used only with approved wording. A picture of a paper band is not an attestation.",d:["A kitchen has been identified as a candidate; no agreement is signed.","A rabbinate or supervision logo cannot be copied without permission.","Each guest decides whether the supervision level suits them."]},
          {k:"What remains open",t:"The entire chain matters.",b:"Production is only the start. Delivery, storage at a non-kosher venue, reheating, tableware, opening and Shabbat require written decisions from the appropriate authorities before a pilot.",d:["Define who checks and rejects damaged packaging.","Other food, bread and wine at the venue are not automatically covered.","The whole restaurant must never be described as kosher."]}
        ],q:"A seal cannot be a graphic promise. It must become a verifiable fact.",photo:"The band in the concept image is intentionally blank, with no kosher mark."}
    },
    restaurants: {
      image:"images/shared-table-concept.webp", next:"familles.html",
      he:{k:"04 / מסעדות",t:"המקום נשאר שלכם.",lead:"ההצעה למסעדה אינה להחליף מטבח או תפריט. זו אפשרות נוספת לאדם שאחרת לא היה מצטרף לשולחן.",status:"אין מסעדות שותפות או תפריטים פעילים. שמות מקומות במסמכי המחקר הם יעדי בדיקה בלבד, לא המלצות או הסכמים.",
        s:[
          {k:"הערך למסעדה",t:"עוד כיסא סביב השולחן.",b:"בקבוצה אחת, חלק מהאנשים מזמינים מהמטבח המקומי ואדם אחר זקוק למנה סגורה ממקור אחר. המודל נועד לאפשר לקבוצה להישאר יחד, בתנאי שהמסעדה רוצה בכך ושנוהל השירות מאושר.",d:["המסעדה שומרת על המותג ועל התפריט שלה.","הצגה בתפריט חייבת לתאר את המנה בלבד, לא את המקום ככשר.","אין התחייבות להכנסה נוספת לפני פיילוט מדיד."]},
          {k:"פיילוט מצומצם",t:"מתחילים בשירות אחד.",b:"מבחן סביר יתחיל במסעדה אחת, במנה אחת ובחלון שעות מוסכם. לפני כן צריך להסדיר מי מקבל את המשלוח, היכן מאחסנים אותו, איך מתמודדים עם שבר באריזה ומי עונה לשאלת לקוח.",d:["יש למדוד ביקוש, זמן שירות, החזרות ופחת.","יש להתאים את המנה לסגנון ולאילוצי המקום.","החלטות על שבת, חימום וכלים אינן החלטות שיווק."]}
        ],q:"לא מסעדה אחרת. אפשרות אחת חדשה בתפריט שלה.",photo:"המסעדה שבתמונה היא הדמיה, ולא מקום שהצטרף למיזם."},
      fr:{k:"04 / Restaurants",t:"Votre lieu reste le vôtre.",lead:"La proposition au restaurateur ne remplace ni sa cuisine ni sa carte. Elle ajoute une option pour une personne qui, autrement, ne rejoindrait pas la table.",status:"Aucun restaurant partenaire et aucune carte active. Les lieux cités dans les dossiers de recherche sont des pistes à vérifier, sans recommandation ni accord.",
        s:[
          {k:"L'intérêt du lieu",t:"Une chaise de plus à table.",b:"Dans un même groupe, certains convives commandent la cuisine de la maison tandis qu'un autre cherche un plat fermé d'une autre source. Le modèle vise à garder le groupe ensemble, si le restaurateur le souhaite et si le service est validé.",d:["Le lieu garde sa marque et son menu.","La ligne de carte doit décrire le plat, jamais qualifier toute la salle de cachère.","Aucun revenu additionnel n'est promis avant un pilote mesuré."]},
          {k:"Un essai limité",t:"Commencer par un service.",b:"Un test raisonnable commencerait avec un lieu, un plat et une plage de service convenue. Il faut d'abord définir qui reçoit la livraison, où elle est stockée, quoi faire si l'emballage est rompu et qui répond aux questions des clients.",d:["Mesurer la demande, le temps de service, les retours et les pertes.","Adapter le plat au style et aux contraintes du lieu.","Shabbat, réchauffage et vaisselle ne sont pas des décisions marketing."]}
        ],q:"Pas un autre restaurant. Une option nouvelle sur sa propre carte.",photo:"La salle illustrée est une visualisation, pas un établissement engagé."},
      en:{k:"04 / Restaurants",t:"Your venue stays yours.",lead:"The proposal to a restaurant does not replace its kitchen or menu. It adds an option for someone who otherwise might not join the table.",status:"There are no partner restaurants or live menu items. Venues named in research files are leads for evaluation, not recommendations or agreements.",
        s:[
          {k:"The venue's interest",t:"One more seat at the table.",b:"In one group, some guests order from the house kitchen while another seeks a closed meal from a different source. The model aims to keep the group together, if the venue wants it and service is approved.",d:["The venue retains its own brand and menu.","A menu line must describe the meal, not call the whole venue kosher.","No added revenue is promised before a measured pilot."]},
          {k:"A limited pilot",t:"Start with one service.",b:"A reasonable test would begin with one venue, one meal and an agreed service window. First define who receives the delivery, where it is stored, what happens when packaging breaks and who answers guests' questions.",d:["Measure demand, service time, returns and waste.","Fit the meal to the venue's style and constraints.","Shabbat, reheating and tableware are not marketing decisions."]}
        ],q:"Not a different restaurant. One new option on its own menu.",photo:"The dining room is a visualisation, not an enrolled venue."}
    },
    familles: {
      image:"images/shared-table-concept.webp", next:"cuisine.html",
      he:{k:"05 / יחד",t:"להישאר סביב אותו שולחן.",lead:"בני משפחה, חברים ובני זוג אינם תמיד אוכלים באותה דרך. הרעיון משאיר מקום לבחירה של כל אחד, בלי לבקש מאדם לוותר על דרכו.",status:"זהו תיאור של צורך אנושי, לא עדות של משפחה שהשתמשה בשירות. השירות עדיין לא קיים.",
        s:[
          {k:"רגע מוכר",t:"ההזמנה הקבוצתית.",b:"המשפחה בוחרת מסעדה שהיא אוהבת. אחד החברים מבקש מוצר עם השגחה המתאימה לו. היום האפשרויות עלולות להיות להיפרד, לאכול לפני הפגישה או לוותר על הארוחה המשותפת.",d:["המטרה היא לאפשר שיחה ונוכחות באותו מקום.","אף אדם אינו חייב לבחור במנה המוצעת.","לא כל אורח שומר כשרות ירגיש בנוח במסעדה שאינה כשרה."]},
          {k:"גבולות ברורים",t:"אוכלים יחד, בוחרים בנפרד.",b:"אם נוצר שירות תקף, הסועד שבוחר במנה הסגורה בודק את המידע עליה. האחרים ממשיכים להזמין כרגיל. חשוב לומר בבירור מה לא נכלל: כלי המסעדה, הלחם, היין ותוספות שלא אושרו.",d:["ההחלטה ההלכתית האישית נשארת בידי כל סועד ורבו.","השירות אינו מכשיר את המסעדה או את יתר התפריט.","אין באתר הזה הזמנות, דירוגים או סיפורי לקוחות."]}
        ],q:"לפעמים כל מה שצריך הוא אפשרות נוספת — כדי להמשיך לשבת יחד.",photo:"המשפחה בתמונה היא המחשה. אין כאן סיפור לקוח אמיתי."},
      fr:{k:"05 / Ensemble",t:"Rester à la même table.",lead:"Parents, amis et couples ne mangent pas toujours de la même façon. L'idée donne une place au choix de chacun, sans demander à quiconque de renoncer à ses règles.",status:"Cette scène décrit un besoin humain ; ce n'est pas le témoignage d'une famille ayant utilisé le service. Le service n'existe pas encore.",
        s:[
          {k:"Un moment familier",t:"Le dîner du groupe.",b:"Une famille choisit un restaurant qu'elle aime. L'un de ses membres a besoin d'un produit dont la supervision lui convient. Aujourd'hui, les options peuvent être de se séparer, de manger avant ou de manquer le repas commun.",d:["Le but est de permettre la présence et la conversation dans un même lieu.","Personne n'est tenu de choisir le plat proposé.","Tous les convives observants n'accepteront pas de s'asseoir dans un lieu non cachère."]},
          {k:"Des limites claires",t:"Ensemble, avec des choix distincts.",b:"Si un service conforme est établi, le convive qui choisit le plat fermé vérifie les informations associées. Les autres commandent comme d'habitude. Il faut dire clairement ce qui n'est pas inclus : vaisselle de la maison, pain, vin et accompagnements non validés.",d:["La décision halakhique personnelle appartient au convive et à son rav.","Le service ne rend pas le restaurant ni le reste de la carte cachères.","Ce site ne présente ni commandes, ni notes, ni témoignages clients."]}
        ],q:"Parfois, une option de plus suffit pour rester assis ensemble.",photo:"La famille dans l'image est une représentation, pas un témoignage réel."},
      en:{k:"05 / Together",t:"Stay at the same table.",lead:"Families, friends and couples do not always eat the same way. The idea makes room for each person's choice without asking anyone to give up their practice.",status:"This scene describes a human need; it is not a testimonial from a family that used the service. The service does not yet exist.",
        s:[
          {k:"A familiar moment",t:"The group dinner.",b:"A family chooses a restaurant they enjoy. One member needs a product with a level of supervision that suits them. Today the choices may be to separate, eat beforehand or skip the shared meal.",d:["The aim is to make room for conversation and presence in one place.","No one is required to choose the proposed meal.","Not every observant guest will be comfortable in a non-kosher venue."]},
          {k:"Clear boundaries",t:"Together, with separate choices.",b:"If a compliant service is established, the guest choosing the closed meal checks its information. Others order as usual. The exclusions must be plain: venue tableware, bread, wine and unapproved sides.",d:["Personal halakhic decisions remain with each guest and their rabbi.","The service does not make the restaurant or its wider menu kosher.","This site has no orders, ratings or customer testimonials."]}
        ],q:"Sometimes one additional option is enough to stay seated together.",photo:"The family scene is a representation, not a real customer account."}
    },
    cuisine: {
      image:"images/sealed-meal-concept.webp", next:"tel-aviv.html",
      he:{k:"06 / המטבח",t:"המטבח קודם למותג.",lead:"סורוצקין / Jewish Deli הוא מטבח שנבחן כמועמד בעקבות ההצעה המקורית. כל קו ייצור צריך להתחיל בשיחה איתם ובבדיקת התנאים שלהם.",status:"לא נחתם הסכם עם Jewish Deli. אין רשות להשתמש בתעודה, בשם או במנות שלהם כהבטחה מסחרית של המיזם.",
        s:[
          {k:"השותף האפשרי",t:"ללמוד לפני שמציעים.",b:"צריך להכיר את המנות, יכולת הייצור, האריזות, זמני ההכנה, גבולות ההשגחה ותנאי האספקה של המטבח. גם אם למטבח יש אישור על פעילותו, אין להסיק אוטומטית שהוא מכסה את השירות החדש.",d:["השם סורוצקין מוזכר כמועמד בלבד.","אין להשתמש בתמונות מוצר שלהם כאילו הן מוצר המיזם.","כל מצגת לבית העסק תהיה הצעה, לא הודעה על שותפות."]},
          {k:"פיתוח קווים",t:"בשר, חלב, פסטה וצומח.",b:"הקווים מיועדים לצרכים שונים של מסעדות. מסעדת בשר עשויה לבחון מנה בשרית; מקום צמחוני עשוי לבחון פרווה. התאמה קולינרית אינה מחליפה הפרדה, פיקוח וסימון כנדרש.",d:["מפותחים מתכונים רק עם המטבח ובכפוף ליכולת אמיתית.","פסטה יכולה להיות חלבית או פרווה לפי המתכון המאושר.","'טבעוני' מתאר רכיבים; הוא אינו תעודת כשרות."]}
        ],q:"לא כופים על מטבח את הרעיון. בונים אותו יחד, אם ירצה.",photo:"תמונת המזון היא הדמיית אריזה, לא צילום של מוצר Jewish Deli."},
      fr:{k:"06 / La cuisine",t:"La cuisine avant la marque.",lead:"Sorotzkin / Jewish Deli est une cuisine candidate issue de l'idée initiale. Toute ligne de production devrait commencer par une discussion avec elle et l'examen de ses conditions.",status:"Aucun accord n'est signé avec Jewish Deli. Le projet n'est pas autorisé à présenter son certificat, son nom ou ses plats comme sa propre offre commerciale.",
        s:[
          {k:"Un partenaire possible",t:"Comprendre avant de proposer.",b:"Il faut connaître les plats, la capacité, les emballages, les horaires, le périmètre de supervision et les conditions de livraison de la cuisine. Même si une cuisine est supervisée, on ne peut pas en déduire que le nouveau service est couvert.",d:["Sorotzkin est cité comme candidat, uniquement.","Ses photos de produits ne sont pas présentées comme les nôtres.","Un dossier envoyé à la cuisine sera une proposition, jamais l'annonce d'un partenariat."]},
          {k:"Des lignes à développer",t:"Viande, lait, pâtes, végétal.",b:"Les pistes répondent à des lieux différents. Un restaurant de viande pourrait étudier une ligne carnée ; un lieu végétal, une option parve. La pertinence culinaire ne remplace pas la séparation, la supervision et l'étiquetage nécessaires.",d:["Les recettes se travaillent avec la cuisine, selon sa capacité réelle.","Une pâte peut être lactée ou parve selon sa recette approuvée.","« Végan » décrit des ingrédients, pas un certificat de cacheroute."]}
        ],q:"Le concept ne s'impose pas à une cuisine. Il se construit avec elle, si elle le souhaite.",photo:"La photographie illustre une piste d'emballage, pas un produit Jewish Deli."},
      en:{k:"06 / The kitchen",t:"Kitchen before brand.",lead:"Sorotzkin / Jewish Deli is a candidate kitchen suggested by the original idea. Any production line would begin by discussing its own terms with the team.",status:"No agreement has been signed with Jewish Deli. This project cannot present its certificate, name or dishes as its own commercial offer.",
        s:[
          {k:"A possible partner",t:"Understand before proposing.",b:"The kitchen's dishes, capacity, packaging, preparation times, supervision scope and delivery conditions all need to be understood. Supervision of a kitchen does not automatically cover a new service model.",d:["Sorotzkin is mentioned only as a candidate.","Its product photos are not passed off as our products.","A document sent to the kitchen would be a proposal, not a partnership announcement."]},
          {k:"Production paths",t:"Meat, dairy, pasta, plant-based.",b:"Different venues call for different lines. A meat restaurant might consider a meat meal; a plant-based place might consider a pareve option. Culinary fit cannot replace separation, supervision or labelling.",d:["Recipes are developed with the kitchen and its real capacity.","Pasta may be dairy or pareve depending on an approved recipe.","Vegan describes ingredients; it is not kosher certification."]}
        ],q:"The concept is not imposed on a kitchen. It is built together, if they choose.",photo:"The photograph illustrates a packaging direction, not a Jewish Deli product."}
    },
    "tel-aviv": {
      image:"images/shared-table-concept.webp", next:"menus-hypothetiques.html",
      he:{k:"07 / העיר",t:"תל אביב כשטח ניסיון.",lead:"העיר מאפשרת ללמוד על שולחנות מעורבים ועל מסעדות מסוגים שונים. היא אינה מספקת הוכחה אוטומטית לביקוש.",status:"המחקר ממפה אזורים ומקומות ציבוריים בלבד. לא נעשתה פנייה למסעדות, ואין מדידה אמינה לעלייה בשמירת כשרות בכל שכונה.",
        s:[
          {k:"הגל הראשון",t:"מרכז ונווה צדק.",b:"רחובות שוקקים, שולחנות ארוכים ומטבחים שונים מאפשרים לשאול שאלות קונקרטיות: האם קבוצה באמת משנה מקום בגלל סועד אחד, והאם מסעדה רוצה להוסיף מוצר חיצוני סגור?",d:["המסמכים בוחנים אזורים, לא טוענים שמסעדה כלשהי הצטרפה.","פתיחה בשבת של מקום אינה אישור למכירת המנה באותו יום.","מחקר דמוגרפי מקומי עדיין חסר."]},
          {k:"איך בוחרים פיילוט",t:"התאמה לפני פריסה.",b:"מסעדה מתאימה צריכה מקום לשולחן משותף, צוות שמוכן לפרוטוקול שירות וביקוש שאפשר למדוד. רק אחרי ניסיון קטן אפשר לשקול שכונות נוספות או עיר אחרת.",d:["מועמדות אינה שותפות.","יש לאמת מחדש כתובת, תפריט ושעות לפני פנייה.","הרחבה להרצליה או לחיפה תישען על תוצאות, לא על מפה יפה."]}
        ],q:"העיר היא מקום ללמוד בו. היא עדיין לא הוכחה למודל.",photo:"תמונת המסעדה היא המחשה; היא אינה מתעדת פיילוט בתל אביב."},
      fr:{k:"07 / La ville",t:"Tel Aviv comme terrain d'essai.",lead:"La ville permet d'étudier des tables mixtes et des restaurants très différents. Elle ne prouve pas à elle seule la demande.",status:"Le travail recense des quartiers et des lieux publics uniquement. Aucun restaurant n'a été approché et aucune hausse de pratique cachère par quartier n'a été établie.",
        s:[
          {k:"Premier cercle",t:"Centre et Neve Tzedek.",b:"Rues animées, tables de groupe et cuisines variées permettent de poser des questions concrètes : un groupe change-t-il vraiment d'adresse pour une personne, et un restaurateur veut-il ajouter un produit externe fermé ?",d:["Les dossiers examinent des zones, sans prétendre qu'un lieu participe.","L'ouverture d'un restaurant le samedi n'autorise pas la vente du plat ce jour-là.","Une mesure démographique locale manque encore."]},
          {k:"Choisir un pilote",t:"L'ajustement avant l'échelle.",b:"Un lieu pertinent doit accueillir une table commune, avoir une équipe ouverte à un protocole de service et permettre de mesurer la demande. Une deuxième zone ou ville ne se décide qu'après un essai limité.",d:["Une piste de prospection n'est pas un partenaire.","Adresse, carte et horaires devront être revérifiés avant contact.","Herzliya ou Haïfa viendraient après des résultats, pas après une belle carte."]}
        ],q:"La ville est un terrain pour apprendre. Elle n'est pas encore la preuve du modèle.",photo:"La salle est une image conceptuelle, pas le compte rendu d'un pilote à Tel Aviv."},
      en:{k:"07 / The city",t:"Tel Aviv as a test ground.",lead:"The city offers mixed tables and varied restaurants to study. That alone does not prove demand.",status:"Research maps public areas and venues only. No restaurant has been approached, and no neighbourhood-level rise in kosher observance has been established.",
        s:[
          {k:"First area",t:"The centre and Neve Tzedek.",b:"Busy streets, group tables and varied kitchens let us ask concrete questions: does a group really change venues for one person, and would a restaurant add an externally prepared closed meal?",d:["Research examines areas; it does not claim any venue has joined.","Being open on Saturday does not authorise sale of the meal then.","Local demographic evidence is still missing."]},
          {k:"Choose a pilot",t:"Fit before scale.",b:"A suitable venue needs room for a shared table, a team open to a service protocol and demand that can be measured. A second district or city should follow only after a small test.",d:["A prospect is not a partner.","Address, menu and hours must be checked again before outreach.","Herzliya or Haifa should follow results, not a compelling map."]}
        ],q:"The city is a place to learn. It is not yet proof of the model.",photo:"The room is conceptual, not a record of a Tel Aviv pilot."}
    },
    "menus-hypothetiques": {
      image:"images/sealed-meal-concept.webp", next:"geste.html",
      he:{k:"08 / אפשרויות",t:"תפריט שעדיין לא קיים.",lead:"ארבע דוגמאות לפיתוח משותף עם מטבח מתאים. אלה אינם מוצרים של Jewish Deli, אינם מופיעים במסעדה ואינם זמינים להזמנה.",status:"ארבע המנות המוצעות כאן הן רעיונות בלבד. בהמשך מופיעים 15 תפריטים אמיתיים כמקורות למחקר, ללא שותפות. אין תפריט חתום, מחיר, זמינות או אישור למתכונים שלנו.",
        s:[
          {k:"איך קוראים את הדוגמאות",t:"לפי המקום, לא לפי הבטחה.",b:"כל מסעדה תצטרך מנה שתתאים לקהל, לריח, לזמן השירות ולתנאי המטבח. גם אחרי התאמה קולינרית, כל מתכון חייב בדיקה ואישור בפועל לפני שניתן להציגו כמנה כשרה.",d:["הדוגמאות אינן כוללות משקאות, לחם או כלי מסעדה.","סיווג בשרי, חלבי או פרווה יופיע רק על מוצר מאושר.","אין להעתיק את הטקסט לתפריט אמיתי ללא אישור."]}
        ],cards:[["בשרי / רעיון","עוף צלוי עם ירקות שורש","מנה שיכולה להתאים לבית אוכל בשרי, אם מתכון, ייצור וחימום יאושרו."],["חלבי / רעיון","פסטה ברוטב עדין","כיוון לבית קפה חלבי; סוג הגבינה, האריזה והשירות מחייבים בדיקה."],["פרווה / רעיון","קערת דגנים וירקות","אפשרות למקום טבעוני, בתנאי שכל רכיב והייצור נבדקו. טבעוני אינו אישור כשרות."],["פסטה / רעיון","פסטה עגבניות סגורה","תכנון להגשה מהירה; צריך לבחון מרקם אחרי הובלה וחימום מותר."]],
        q:"דוגמה טובה פותחת שיחה. מוצר אמיתי מתחיל באישור המטבח.",photo:"המגש בתמונה הוא רעיון חזותי, לא אחת מארבע מנות אמיתיות."},
      fr:{k:"08 / Possibilités",t:"Une carte qui n'existe pas encore.",lead:"Quatre exemples à développer avec une cuisine adaptée. Ce ne sont pas des produits de Jewish Deli ; aucun ne figure dans un restaurant ou ne peut être commandé.",status:"Les quatre plats proposés ici sont imaginés. Plus bas, 15 cartes réelles servent de sources de recherche, sans partenariat. Aucun de nos plats, prix, stocks ou recettes n'est approuvé.",
        s:[
          {k:"Lire ces exemples",t:"Partir du lieu, pas d'une promesse.",b:"Chaque restaurant demandera un plat adapté à son public, aux odeurs, au rythme du service et à ses contraintes. Même après le travail culinaire, chaque recette doit être réellement contrôlée et approuvée avant toute présentation comme cachère.",d:["Ces exemples n'incluent ni boisson, ni pain, ni vaisselle du restaurant.","Les mentions viande, lait ou parve n'apparaîtront que sur un produit approuvé.","Ce texte ne peut pas être repris tel quel sur une carte réelle."]}
        ],cards:[["Viande / hypothèse","Poulet rôti et légumes racines","Une piste pour une table carnée, si la recette, la production et le réchauffage sont validés."],["Lait / hypothèse","Pâtes à la sauce douce","Une piste pour un café lacté ; fromage, emballage et service demandent un examen."],["Parve / hypothèse","Bol de céréales et légumes","Pour une salle végétale, si chaque ingrédient et la production sont contrôlés. Végan ne signifie pas cachère."],["Pâtes / hypothèse","Pâtes à la tomate, fermées","Pensées pour un service rapide ; texture après transport et réchauffage autorisé restent à tester."]],
        q:"Un bon exemple ouvre la conversation. Un vrai produit commence avec l'accord de la cuisine.",photo:"Le plateau photographié est une étude visuelle, aucune de ces quatre recettes réelles."},
      en:{k:"08 / Possibilities",t:"A menu that does not yet exist.",lead:"Four examples to develop with a suitable kitchen. These are not Jewish Deli products; none is on a restaurant menu or available to order.",status:"The four proposed dishes here are concepts. Below, 15 real menus are research sources, with no partnership. None of our dishes, prices, stock, or recipes is approved.",
        s:[
          {k:"Reading these examples",t:"Start with the venue, not a promise.",b:"Each venue needs a meal suited to its guests, aromas, service pace and constraints. Culinary fit is only the beginning: every recipe needs actual review and approval before being presented as kosher.",d:["Examples exclude drinks, bread and restaurant tableware.","Meat, dairy or pareve labels belong only on an approved real product.","This copy must not be placed unchanged on an actual menu."]}
        ],cards:[["Meat / concept","Roast chicken and root vegetables","A direction for a meat-led venue, if recipe, production and reheating are approved."],["Dairy / concept","Pasta with a delicate sauce","A direction for a dairy café; cheese, packaging and service need review."],["Pareve / concept","Grains and vegetables","For a plant-based room, if every ingredient and production step is checked. Vegan is not kosher certification."],["Pasta / concept","Closed tomato pasta","Designed for quick service; texture after transport and permitted reheating need testing."]],
        q:"A strong example opens a conversation. A real product starts with kitchen approval.",photo:"The pictured tray is a visual study, not one of four existing recipes."}
    }
  };
  const slug = document.body.dataset.page;
  const data = PAGE[slug];
  if (!data) return;
  const AUDIO_SOURCE = {
    geste: "comment-ca-marche",
    plat: "plat",
    sceau: "sceau",
    restaurants: "restaurants",
    familles: "familles",
    cuisine: "cuisine",
    "tel-aviv": "tel-aviv",
    "menus-hypothetiques": "ligne-menu"
  };
  const AUDIO_COPY = {
    he: { play: "להאזנה לתרחיש המיזם", stop: "לעצור את ההשמעה", note: "הקלטה להמחשה · השירות אינו פעיל", transcript: "טקסט ההקלטה", unavailable: "ההקלטה אינה זמינה כרגע" },
    fr: { play: "Écouter le scénario du projet", stop: "Arrêter la lecture", note: "Voix illustrative · service non actif", transcript: "Lire la transcription", unavailable: "Enregistrement indisponible pour le moment" },
    en: { play: "Listen to the proposed scenario", stop: "Stop playback", note: "Illustrative narration · service not active", transcript: "Read the transcript", unavailable: "Recording is unavailable right now" }
  };
  let language = "he";
  try { const saved = localStorage.getItem("tko-lang"); if (NAV[saved]) language = saved; } catch (_) {}
  const narration = new Audio();
  narration.preload = "none";
  let audioButton = null;
  let audioIcon = null;
  let audioLabel = null;
  let audioRequested = false;
  let audioToken = 0;
  let transcriptPromise = null;

  function updateAudioButton() {
    if (!audioButton) return;
    audioButton.setAttribute("aria-pressed", audioRequested ? "true" : "false");
    audioIcon.textContent = audioRequested ? "■" : "▶";
    audioLabel.textContent = AUDIO_COPY[language][audioRequested ? "stop" : "play"];
  }
  function stopNarration() {
    audioToken += 1;
    audioRequested = false;
    narration.pause();
    if (Number.isFinite(narration.duration) && narration.duration > 0) narration.currentTime = 0;
    updateAudioButton();
  }
  narration.addEventListener("ended", stopNarration);
  function transcripts() {
    if (!transcriptPromise) transcriptPromise = fetch("audio/narration-transcripts.json").then(response => {
      if (!response.ok) throw new Error("Transcript unavailable");
      return response.json();
    });
    return transcriptPromise;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function add(parent, child) { parent.appendChild(child); return child; }
  function image(src, className) {
    const img = el("img", className);
    img.src = src; img.alt = ""; img.loading = "lazy";
    return img;
  }
  function render() {
    stopNarration();
    const common = NAV[language];
    const copy = data[language];
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    document.title = copy.t + " — The Kosher Option Israel";
    document.querySelectorAll("[data-i18n]").forEach(node => {
      const text = common[node.dataset.i18n];
      if (text) node.textContent = text;
    });
    document.querySelectorAll("[data-lang]").forEach(button =>
      button.setAttribute("aria-pressed", button.dataset.lang === language ? "true" : "false"));
    document.querySelectorAll('.drawer a,.desktop-nav a').forEach(link => {
      if (link.getAttribute("href") === slug + ".html") link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    const root = document.getElementById("inner-content");
    root.replaceChildren();

    const hero = add(root, el("section", "inner-hero"));
    const heroImage = add(hero, image(data.image, "inner-hero-image"));
    heroImage.loading = "eager";
    if (slug === "plat" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const film = add(hero, el("video", "inner-hero-film"));
      film.muted = true;
      film.defaultMuted = true;
      film.loop = true;
      film.playsInline = true;
      film.preload = "none";
      film.poster = data.image;
      film.setAttribute("aria-hidden", "true");
      const source = add(film, el("source"));
      source.dataset.src = "video/sealed-meal-grok-loop.mp4";
      source.type = "video/mp4";
      const startFilm = () => {
        if (!film.isConnected || source.hasAttribute("src") || document.visibilityState !== "visible") return;
        source.src = source.dataset.src;
        film.load();
        film.play().catch(() => {});
      };
      const scheduleFilm = () => window.setTimeout(startFilm, 1800);
      if (document.readyState === "complete") scheduleFilm();
      else window.addEventListener("load", scheduleFilm, { once: true });
      const onVisibility = () => {
        startFilm();
        if (!film.isConnected || source.hasAttribute("src")) document.removeEventListener("visibilitychange", onVisibility);
      };
      document.addEventListener("visibilitychange", onVisibility);
    }
    add(hero, el("div", "inner-hero-shade"));
    add(hero, el("div", "inner-hero-rail"));
    const heroContent = add(hero, el("div", "inner-hero-content"));
    add(heroContent, el("p", "eyebrow", copy.k));
    add(heroContent, el("h1", "", copy.t));
    add(heroContent, el("p", "inner-lead", copy.lead));
    const audioWrap = add(heroContent, el("div", "inner-audio"));
    audioButton = add(audioWrap, el("button", "audio-trigger"));
    audioButton.type = "button";
    audioButton.setAttribute("aria-pressed", "false");
    audioButton.dataset.audioToggle = "";
    audioIcon = add(audioButton, el("span", ""));
    audioIcon.setAttribute("aria-hidden", "true");
    audioLabel = add(audioButton, el("span", ""));
    updateAudioButton();
    add(audioWrap, el("p", "inner-audio-note", AUDIO_COPY[language].note));
    audioButton.addEventListener("click", async () => {
      if (audioRequested) { stopNarration(); return; }
      const token = ++audioToken;
      audioRequested = true;
      updateAudioButton();
      narration.src = `audio/${AUDIO_SOURCE[slug]}-${language}.mp3`;
      try {
        await narration.play();
      } catch (_) {
        if (token !== audioToken) return;
        audioRequested = false;
        audioButton.disabled = true;
        audioIcon.textContent = "×";
        audioLabel.textContent = AUDIO_COPY[language].unavailable;
      }
    });
    const bottom = add(hero, el("div", "inner-hero-bottom"));
    add(bottom, el("span", "", common.concept));
    add(bottom, el("span", "", "THE KOSHER OPTION ISRAEL"));

    const status = add(root, el("aside", "status-band"));
    add(status, el("strong", "", common.stage));
    add(status, el("p", "", copy.status));
    const transcript = add(root, el("details", "narration-transcript"));
    add(transcript, el("summary", "", AUDIO_COPY[language].transcript));
    const transcriptBody = add(transcript, el("p", ""));
    transcript.addEventListener("toggle", async () => {
      if (!transcript.open || transcriptBody.textContent) return;
      try {
        const all = await transcripts();
        transcriptBody.textContent = all[slug][language];
      } catch (_) {
        transcriptBody.textContent = AUDIO_COPY[language].unavailable;
      }
    });

    copy.s.forEach((section, index) => {
      const chapter = add(root, el("section", "chapter"));
      const chapterIndex = add(chapter, el("div", "section-index"));
      add(chapterIndex, el("span", "", String(index + 1).padStart(2, "0") + " / " + section.k));
      add(chapterIndex, el("span", "", common.chapter));
      const grid = add(chapter, el("div", "chapter-grid"));
      const heading = add(grid, el("div", "chapter-intro"));
      add(heading, el("p", "eyebrow", section.k));
      add(heading, el("h2", "", section.t));
      const body = add(grid, el("div", "chapter-body"));
      add(body, el("p", "", section.b));
      const list = add(body, el("ol", "detail-list"));
      section.d.forEach((detail, i) => {
        const item = add(list, el("li"));
        add(item, el("span", "", String(i + 1).padStart(2, "0")));
        add(item, el("div", "", detail));
      });
      if (index === 0) {
        const photo = add(root, el("section", "chapter-photo"));
        add(photo, image(data.image, ""));
        const label = add(photo, el("div"));
        add(label, el("p", "eyebrow", common.photo));
        add(label, el("p", "", copy.photo));
      }
    });

    if (copy.cards) {
      const section = add(root, el("section", "chapter"));
      const head = add(section, el("div", "section-index"));
      add(head, el("span", "", common.concept));
      add(head, el("span", "", "04"));
      const cards = add(section, el("div", "concept-cards"));
      copy.cards.forEach((card, i) => {
        const article = add(cards, el("article", "concept-card"));
        add(article, el("span", "card-number", String(i + 1).padStart(2, "0") + " / " + card[0]));
        add(article, el("h3", "", card[1]));
        add(article, el("p", "", card[2]));
      });
    }

    if (slug === "menus-hypothetiques" && Array.isArray(window.TKO_MENUS)) {
      const labels = {
        he: { eyebrow: "מחקר פתוח · 24.09.2026", title: "15 מסעדות. 15 תפריטים אמיתיים.", intro: "אלה מקורות למחקר קולינרי בלבד. שמות המסעדות אינם מציינים קשר, הסכמה או כוונה להשתתף. המנות המצוטטות מתפריטיהן אינן מוצגות כאן ככשרות.", search: "חיפוש לפי מסעדה, עיר או מנה", source: "לפתוח את המקור ↗", count: n => `${n} מתוך 15 מקורות`, none: "אין התאמה. נסו חיפוש אחר." },
        fr: { eyebrow: "Recherche ouverte · 24.09.2026", title: "15 restaurants. 15 cartes réelles.", intro: "Ces liens sont des sources de recherche culinaire. Leur présence ne signifie ni contact, ni accord, ni intention de participer. Les plats cités de leurs cartes ne sont pas présentés comme cachères.", search: "Chercher un restaurant, une ville ou un plat", source: "Ouvrir la source ↗", count: n => `${n} source${n > 1 ? "s" : ""} sur 15`, none: "Aucun résultat. Essayez un autre terme." },
        en: { eyebrow: "Open research · 24 Sep 2026", title: "15 restaurants. 15 real menus.", intro: "These links are culinary research sources. Inclusion does not imply contact, agreement, or intent to participate. Dishes cited from their menus are not presented as kosher.", search: "Search venue, city, or dish", source: "Open source ↗", count: n => `${n} of 15 sources`, none: "No match. Try another search." }
      }[language];
      const research = add(root, el("section", "venue-research"));
      research.id = "venue-research";
      const researchHead = add(research, el("div", "venue-research-head"));
      add(researchHead, el("p", "eyebrow", labels.eyebrow));
      add(researchHead, el("h2", "", labels.title));
      add(researchHead, el("p", "venue-research-intro", labels.intro));
      const controls = add(research, el("div", "venue-research-controls"));
      const searchLabel = add(controls, el("label", "venue-search-label", labels.search));
      const field = add(searchLabel, el("input", "venue-search"));
      field.type = "search";
      field.placeholder = labels.search;
      field.autocomplete = "off";
      const count = add(controls, el("p", "venue-research-count"));
      count.setAttribute("aria-live", "polite");
      const grid = add(research, el("div", "venue-research-grid"));
      const update = () => {
        const query = field.value.trim().toLocaleLowerCase();
        const matches = window.TKO_MENUS.filter(venue =>
          [venue.name, venue.city[language], venue.where[language]].join(" ").toLocaleLowerCase().includes(query));
        count.textContent = labels.count(matches.length);
        grid.replaceChildren();
        if (!matches.length) add(grid, el("p", "venue-empty", labels.none));
        matches.forEach((venue, index) => {
          const card = add(grid, el("article", "venue-research-card"));
          add(card, el("span", "venue-research-number", String(index + 1).padStart(2, "0")));
          add(card, el("h3", "", venue.name));
          add(card, el("p", "venue-research-city", venue.city[language]));
          add(card, el("p", "venue-research-finding", venue.where[language]));
          const link = add(card, el("a", "venue-source", labels.source));
          link.href = venue.href;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        });
      };
      field.addEventListener("input", update);
      update();
    }

    const quote = add(root, el("section", "inner-quote"));
    add(quote, el("p", "eyebrow", "THE KOSHER OPTION ISRAEL"));
    add(quote, el("blockquote", "", copy.q));

    const next = add(root, el("section", "inner-next"));
    const nextLeft = add(next, el("div"));
    add(nextLeft, el("p", "eyebrow", common.next));
    add(nextLeft, el("h2", "", common.next));
    const links = add(nextLeft, el("div", "inner-next-links"));
    const forward = add(links, el("a", "button button-light", common.open + " ↗"));
    forward.href = data.next;
    const home = add(links, el("a", "button button-outline", common.return + " ↗"));
    home.href = "index.html";
    add(next, el("p", "inner-next-note", common.truth));
  }

  document.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", () => {
    language = button.dataset.lang;
    try { localStorage.setItem("tko-lang", language); } catch (_) {}
    render();
  }));
  const trigger = document.querySelector("[data-menu-trigger]");
  const drawer = document.getElementById("site-drawer");
  function closeMenu() {
    drawer.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }
  trigger.addEventListener("click", () => {
    const open = drawer.hidden;
    drawer.hidden = !open;
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("menu-open", open);
  });
  drawer.addEventListener("click", event => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !drawer.hidden) { closeMenu(); trigger.focus(); }
  });
  render();
})();
