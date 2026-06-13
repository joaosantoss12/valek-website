import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RotateScreen from '../components/RotateScreen'
import BackToTop from '../components/BackToTop'
import '../styles/global.css'

export default function AboutMe() {
  return (
    <div className="page">
      <RotateScreen />
      <BackToTop />
      <Navbar />

      <div className="about-hero">
        <span className="section-label">About Me</span>
        <h1>Ruben <span className="gradient-text">Vale</span></h1>
        <p className="about-hero-intro">
          My name is Ruben Vale, I am 26 years old and I am Portuguese. I am currently a content
          creator, a social media influencer and a soccer player.
        </p>
      </div>

      <div className="about-content">

        <div className="about-split">
          <div className="about-img">
            <img src="/img/firstImage.png" alt="ValeK" />
          </div>
          <div className="about-text">
            <h2>The <span className="gradient-text">CS Journey</span></h2>
            <p>
              Let me tell you a little bit of my story so you can know me better and
              be a part of this journey that I am building. I always liked to play
              Counter Strike and it was in the Cyber Cafes in 2008 that I tried the
              game when version 1.6 came out and that gave me that taste to start
              playing at home in my computer. As the years went by and Counter Strike
              evolved, I installed Counter Strike Global Offensive on January 2nd,
              2016 and have been having fun and evolving with friends. It should be
              noted and to kill your curiosity that my first rank was silver 4 :)
            </p>
            <p>
              Then on February 15th, 2019, at the insistence of my friends I did my
              first livestream, but it was just for fun, and I never assumed that I
              would reach the stage I am today. What is certain is that I have been a
              streamer for 3 years now on Twitch and I already have my channel
              verified. I have about 35,000 followers which I am very proud of and the
              community I have and continue to build day after day. After reaching max
              level on faceit on April 8th, 2019, I started playing with some of the
              big names in Portuguese and international Counter Strike, as well as
              achieving some achievements.
            </p>
            <p>
              As time went by I received an offer to officially play for a semi
              professional team where for 6 months I played on the Golden Gaming team
              where we also participated in some national and international
              tournaments throughout the year of 2019.
            </p>
          </div>
        </div>

        <div className="about-callout">
          My stream was evolving slowly and slowly achieving some of the goals I set
          and never thinking about getting the statistics that I have today.
        </div>

        <div className="about-text" style={{ marginBottom: 40 }}>
          <p>
            In 2020 I made streams playing some open qualifiers on Faceit's
            platform and on January 11th, 2020, in the open qualifier I faced nothing
            less than the old Giants team in the quarterfinals of the Counter Strike
            Professional League (LPCS), losing the game to a 16-2 on the map de_dust2
            in which we only put the pistol attacking in the first half.
          </p>
          <p>
            I participated in the LAN HOUSE Penafiel on February 29th, 2020, where in
            the semi final we won after losing the first map and in the second map we
            were losing by 14-5 attacking in de_nuke we went to overtime and won that
            game in the de_nuke map. We went to the third decider map and it was the
            overpass map where we won on overtime the decider. We took to the final a
            BO3 game where we won by 2-0 in maps.
          </p>
          <p>
            On November 4th, 2021, I played the qualifier for Omen Retake playing
            against the professional team called Offset losing the game 16-12. I can
            say that it was a hard game and made me want to learn more and more.
          </p>
          <p>
            It should be noted that all these games were always played with teammates.
            No longer represented by the team previously mentioned.
          </p>
        </div>

        <div className="about-split reverse">
          <div className="about-text">
            <h2>Soccer <span className="gradient-text">Career</span></h2>
            <p>
              I started in soccer at the age of 6 where I played for 4 years for
              Futebol Clube do Porto, where I was coached by Pepijn Lijnders,
              currently Jürgen Klopp's assistant at FC Liverpool.
            </p>
            <p>
              At the age of 10 I moved to Paços de Ferreira until I was 15. At 17 I
              played for Futebol Clube do Sobrado, where I achieved some achievements
              and played the whole season in the senior team. At 18 I played in Sport
              Comércio e Salgueiros for the senior team.
            </p>
            <p>
              At the age of 19 I managed to play in the Portuguese championship
              (3rd league) for União Sport Clube Paredes but at the age of 20 I
              decided to return to Sobrado. I find myself playing for Sporting Clube
              Paivense where in the 2021/2022 season I became champion of the series
              of my division. Now I am playing for FC Alpendorada during the 2022/2023 season.
            </p>
          </div>
          <div className="about-img">
            <img src="/img/lastImage.jpg" alt="Soccer" />
          </div>
        </div>

        <div className="about-callout">
          It is not easy to conciliate everything. I still help my parents in the restaurant they own,
          but as you know who runs for pleasure never tires and none of this would be possible without you all!
        </div>

        <div className="about-videos">
          <div className="about-video">
            <iframe allow="fullscreen" src="https://www.youtube.com/embed/5FgLG7JiM-U" title="2024/2025 — Cinfães" />
            <span className="about-video-label">2024/2025 · Cinfães</span>
          </div>
          <div className="about-video">
            <iframe allow="fullscreen" src="https://www.youtube.com/embed/raOKxih_8Wk" title="2023/2024 — Cinfães" />
            <span className="about-video-label">2023/2024 · Cinfães</span>
          </div>
          <div className="about-video">
            <iframe allow="fullscreen" src="https://www.youtube.com/embed/WcL7QmMtYVw" title="2022/2023 — Alpendorada" />
            <span className="about-video-label">2022/2023 · Alpendorada</span>
          </div>
          <div className="about-video">
            <iframe allow="fullscreen" src="https://www.youtube.com/embed/Htw2i0lEOY4" title="2021/2022 — Paivense" />
            <span className="about-video-label">2021/2022 · Paivense</span>
          </div>
        </div>

        <p className="about-final">
          Now enough of introductions — Welcome to my humble website 🔥
        </p>
      </div>

      <Footer />
    </div>
  )
}
