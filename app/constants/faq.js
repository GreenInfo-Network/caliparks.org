export const faqs = [
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
