/**
 *
 * Text for FAQ page
 * When translating just change the `title` & `content` values
 *
 */

// English version of faqs
const faqsEn = [
  {
    title: 'What is Caliparks.org and how does it work?',
    anchor: 'what',
    content: `<p>Caliparks.org is a web app that puts all 11,826 California State Parks at your fingertips.  We give you an instant snapshot of what\'s happening outdoors by searching Instagram every day to find the latest photos posted by tens of thousands of people visiting parks all across the state.</p>
      <p>And then we use specially curated data to highlight parks great for a whole range of activities, from surfing and boating to visiting a local playground. Then each park has maps, park details, links to park websites, and a select group of parks also have links to make camping reservations or to get involved as a volunteer.</p>
      <p>Once you find a park you want to visit, <a href="http://www.caliparks.org/">Caliparks.org</a> links to trip planner technology from Apple and Google, so that users can pick new locations, plan weekend excursions, share images and comments, and invite others along in their park experience.</p>
      <p>Post photos to Instagram from inside a park and you’ll see them on the site within 24 hours of you posting them in your favorite park. Just have your location services turned on!</p>`
  },
  {
    title: 'How is it different than other apps and who can use it?',
    anchor: 'how',
    content: `<p>Caliparks.org combines data from the California Protected Areas Database, GreenInfo Network, OpenStreetMap and Instagram. Both individual users and park agencies can use this app to see how people interact with the outdoors, which parks are favorites and why!</p>`
  },
  {
    title: 'Where is the app? Why no native app?',
    anchor: 'where',
    content: `<p>CaliParks.org, at launch, is a web app, so you access it through a browser rather than downloading a native application through the App Store or Google Play. We decided to build a browser-based app first for a couple of reasons. Most important, it\'s easier to share and access immediately. No download required. And URLs are easy to share and your friends will see exactly what you see. We also believe it\'s important to enrich the data within parks -- through this process of sharing open data and improving it -- so when we do create native apps, they have greater value when you’re out in a park and can take advantage of the connection-free access of a native smartphone application.</p>`
  },
  {
    title: 'Aren’t you filtering the social media?',
    anchor: 'filtering',
    content: `<p>Caliparks.org is a no filter zone. We leave it up to you to search for what you find interesting and relevant to your park.</p>`
  },
  {
    title: 'Are you taking every photo that mentions a park name on social media?',
    anchor: 'photo-curation',
    content: `<p>No, we only retrieve photos when you post within parks with your location device turned on. That’s how we find your geolocation and link your stories and pictures to the parks they were posted in!</p>`
  },
  {
    title: 'Parks are missing or have the wrong name. What’s the deal?',
    anchor: 'parks-missing',
    content: `<p>The list of parks on CaliParks.org is the most complete single list that exists for California, thanks to the California Protected Areas Database (calands.org), but with 11,826 parks, some are bound to have mispelled or wrong names. If you see a park where the name seems to be incorrect, hit the feedback button in the app and let us know. We’ll alert the folks who maintain calands.org and they’ll fix it in their data.</p>`
  },
  {
    title: 'Some activities are wrong. What’s the deal?',
    anchor: 'wrong-activities',
    content: '<p>We used data from park agency websites and did several rounds of review to get make the information as accurate as possible, but if you see a missing or incorrect activity, please give us your feedback using the button at the bottom of every page!</p>'
  },
  {
    title: 'What if a park map has errors on it?',
    anchor: 'park-errors',
    content: `<p>We created a custom map for CaliParks.org, which allows us to control the data and appearance, but there are still going to be some data errors. Park names, management, and boundaries come from the California Protected Areas Database, and you can report errors in those over at <a href="http://www.calands.org/revise">calands.org</a>.</p>
      <p>Most of the rest of our data, including trails, come from OpenStreetMap.org, the world’s largest community-made map. Are you a parks employee or expert? You can help make OSM better by making edits yourself at openstreetmap.org, or just let us know of errors using the "feedback" button on the bottom of every page, and we’ll do our best to get them fixed pronto!</p>
      <p>And if you’re really interested in how we’re helping manage trails data, check out <a href="http://stamen.wpengine.com/on-the-right-trail-open-data/">[this blog post]</a> for more on the "social_path" tag and our efforts to help bring together the goals of trail managers with the culture of OpenStreetMap.</p>`
  },
  {
    title: 'What if I see nudity on the site?',
    anchor: 'nudity',
    content: '<p>Since we’re not curating photos, you will see a variety of images from people’s outdoor experiences, and sometimes people aren’t wearing all the clothes you might wish. If photos appear pornographic, you can help make CaliParks.org and the internet a bit more wholesome by clicking through to the photo on Flickr or Instagram and reporting it in violation of their terms. You can do this anonymously and in our experience, inappropriate photos get pulled within a day or two.</p>'
  },
  {
    title: 'How did you make this thing?',
    anchor: 'the-making-of',
    content: '<p>We had fun writing algorithms to gather up social media and then intersect those points with the shapes of all the parks. We started with harvests from Flickr, Instagram, Twitter, and Foursquare, but it quickly became clear that Instagram is the place to be when it comes to diverse audiences and huge volumes of images flowing out of parks. If you want to get super nerdy, check out <a href="http://content.stamen.com/mapping_the_intersection_between_social_media_and_open_spaces_in_ca">this process post</a> and see lots of fun maps.</p>'
  }
];

// Spanish version of faqs
const faqsEs = [
  {
    title: 'Qué es Caliparks.org y como funcióna?',
    anchor: 'what',
    content: `<p>Caliparks.org es una aplicación de web que pone los 11.826 Parques del Estado de California a su alcance. Nosotros le damos un panorama instantanio de lo que esta pasando afuera cuando mire a Instagram todos los días para buscar las últimas fotos posteado por miles de personas que están visitando los parques en todo el estado.</p>
      <p>Nosotros usamos datos especiamente hecho para destacar los parques que sean buenos para un rango grande de actividades, desde hacer surf y navegación hasta visitar el jardín infantíl local. Luego, cada parque tiene mapas, detalles del parque, vínculas a la pagina web de los parques, y algunos grupos de parques también tiene vínculas para hacer reservaciones para acampar o para participar como voluntario.</p>
      <p>Una vez que encuentre el parque que quiere visitar, <a href="http://www.caliparks.org/">Caliparks.org</a> conecta la tecnología de la organizador del viaje de Apple y Google, para que los usuarios puedan eligir las nuevas ubicaciones, planificar excursiones de fin de semana, compartir imagines y comentarios, y invitar a otras personas a su experiencia en los parques.</p>
      <p>Publica fotos a Instagram desde a dentro del parque y las encontrará en el sitio entre 24 horas de que las haya publicado en su parque favorito. Solo tenga su servicio de ubicación prendida!</p>`
  },
  {
    title: 'Cómo es diferente que otra aplicaciones y quién puede usar?',
    anchor: 'how',
    content: `<p>Caliparks.org combina los datos del Base de Datos de las Áreas Protegidas de California, el Red de GreenInfo, OpenStreetMap y Instagram. Usuarios individuales y agencias de los parques pueden usar esta aplicación para ver como interactua la gente con la naturaleza, cuales parques son los favoritos y por qué!</p>`
  },
  {
    title: 'Dónde esta la aplicación? Por qué no aplicación nativa?',
    anchor: 'where',
    content: `<p>Caliparks.org, comienza, es un app de web, así que se puede acesarlo a través de un navegador, en vez de descargar una aplicación nativa a través del AppStore o Google Play. Decidimos construir una aplicación a través del navegador por algunas razones. Más importante, es más fácil compartir y acesar inmediatamente. No descarga requerida. Y los URL son faciles compartir y sus amigos verán exactamente lo que usted ve. Además, creemos que es importante enriquecer los datos entre los parques -- a través de este proceso de compartir los datos abiertos y mejorandolo -- así que cuando sí creamos aplicaciones nativas, tendrán un mayor valor cuando usted esté en el parque y se puede aprovechar la conexión- aceso gratís de una aplicación nativa del smartphone</p>`
  },
  {
    title: 'No están filtrando la red social?',
    anchor: 'filtering',
    content: `<p>Caliparks.org es una zona de no filtración. Dejamos a usted buscar lo que encuentra interesante y relevante a su parque.</p>`
  },
  {
    title: 'Están sacando fotos que menciona el nombre del parque en la red social?',
    anchor: 'photo-curation',
    content: `<p>No, solo recuparamos fotos cuando usted las publica a dentro los parques con el servicio de ubicación prendida. Así es como encontramos su ubicación geográfica y víncular sus historias y fotos a los parques que esaban publicadas!</p>`
  },
  {
    title: 'Falta un parque o tiene el nombre equivocado. Qué pasa?',
    anchor: 'parks-missing',
    content: `<p>La lista de parques en CaliParks.org es la lista más completa que existe para California, gracias al Base de Datos de las Áreas Protegidas de California (calands.org), pero con 11.826 parques, algunos seguramente no están o tienen nombres mal escritos o equivocados. Si usted encuentra un parque donde el nombre parece incorecto, haz click en comentarios en el App y déjenos saber. Avisarémos los que mantengan calands.org y los arreglarán en su data.</p>`
  },
  {
    title: 'Algunas actividades son equivocadas. Qué pasa?',
    anchor: 'wrong-activities',
    content: '<p>Usamos los datos de la página web de las agencias del parque y hicimos varias revistas para hacer la información más precisa posible, pero si ústed encuentra que falta una actividad o que sea incorecta, por favor dános su comentario, utilizando el botón abajo de cada página!</p>'
  },
  {
    title: 'Qué pasa si un mapa del parque tiene errores?',
    anchor: 'park-errors',
    content: `<p>Creamos un mapa personalizado para CaliParks.org, que nos deja controlar los datos y aspeto, pero todavía tendrá algunos errores del data. Nombres de los parques, gerencia, y límites vienen del Base de Datos de los Áreas Protegidos de California, y se puede reportar errores en ellos a <a href="http://www.calands.org/revise">calands.org</a>.</p>
      <p>Casi todo el resto de los datos, incluiendo los caminos, vienen de OpenStreetMap.org, el mapa más grande del mundo hecho por la comunidad. Usted es un empleado de los parques o un experto? Se puede ayudar mejorar OSM y editarlo usted mismo a openstreetmap.org, o solo avísenos de los errores con el botón de comentarios al abajo de cada página, y vamos a hacer lo mejor para arreglarlos pronto!</p>
      <p>Y si usted está muy interesado en como estamos ayudando en mantener los datos de los caminos, mire <a href="http://stamen.wpengine.com/on-the-right-trail-open-data/">[este blog]</a> para más de la etiqueta ''social_path'' y nuestros esfuerzos para ayudar juntar las metas de los supervisores de los caminos con la cultura de OpenStreetMap.</p>`
  },
  {
    title: 'Qué pasa si veo desnudez en el sitio?',
    anchor: 'nudity',
    content: '<p>Como no estamos produciendo las fotos, verá una variedad de imagines de las experiencias de naturaleza de la gente, y a veces la gente no está llevando ropa como quizá usted espere. Si las fotos parecen pornograficas, se puede ayudar hacer CaliParks.org y el internet un poco más íntegro si mire a las fotos en Flickr o Instagram y reportar cualquiera foto que este en violación de sus términos. Se puede ser anonimo y en nuestra experiencia, sacan las fotos inapropiadas entre uno o dos días. </p>'
  },
  {
    title: 'Cómo hicieron esto?',
    anchor: 'the-making-of',
    content: '<p>Nos divertimos escribir los algoritmos para juntar la media social y luego cruzar estos puntos con las formas de todos los parques. Empezamos con las cosechas de Flickr, Instagram, Twitter, y Foursquare, pero de pronto fue claro que Instagram es el mejor lugar para el público diverso y grandes volumes de imagines llegando de los parques. Si usted quiere ser súper nerd, vea <a href="http://content.stamen.com/mapping_the_intersection_between_social_media_and_open_spaces_in_ca">la publicidad de proceso</a> y verá muchos mapas divertidos.</p>'
  }
];

export const faqs = {
  en: faqsEn,
  es: faqsEs
};
