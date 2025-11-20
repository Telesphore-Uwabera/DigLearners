import React from 'react';
import { useTranslation } from '../../lib/language';
import PublicFooter from '../../components/layout/PublicFooter';
import './LegalPages.css';

const TermsAndConditions = () => {
  const { t, currentLanguage } = useTranslation();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1>
            {currentLanguage === 'rw' 
              ? 'Amabwiriza n\'Amabwiriza' 
              : 'Terms and Conditions'
            }
          </h1>
          <p className="legal-subtitle">
            {currentLanguage === 'rw' 
              ? 'Kuva ku wa 1 Mutarama 2024' 
              : 'Effective as of January 1, 2024'
            }
          </p>
        </header>

        <div className="legal-content">
          {/* Introduction */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '1. Intangiriro' 
                : '1. Introduction'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'DigLearners ni ikigo cy\'uburezi bwo mu ikoranabuhanga cyashyizweho mu Rwanda, cyategenewe gufasha abanyeshuri mu mashuri abanza kwiga ubwoba bwo mu ikoranabuhanga mu nzira y\'umwuga n\'y\'ubwoba.' 
                : 'DigLearners is an educational technology platform based in Rwanda, designed to help primary school students learn digital literacy skills in a safe, professional, and engaging manner.'
              }
            </p>
            <p>
              {currentLanguage === 'rw' 
                ? 'Iyi mabwiriza asobanura uko mukoresha serivisi zacu, ibikurikizwa n\'uburenganzira bwawe. Mukoresha DigLearners, mwemera ko mwiyandikishije kandi mukemera amabwiriza yose yanditse aha.' 
                : 'These Terms and Conditions govern your use of our services, outline your responsibilities, and define your rights. By using DigLearners, you acknowledge that you have read, understood, and agree to be bound by all terms outlined here.'
              }
            </p>
            <p>
              {currentLanguage === 'rw' 
                ? 'Niba mutemera amabwiriza yacu, nyamuneka mutazikoresha serivisi zacu. Niba mufite ibibazo, nyamuneka mutwandikire mbere y\'uko mukoresha serivisi zacu.' 
                : 'If you do not agree to these terms, please do not use our services. If you have questions, please contact us before using our services.'
              }
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '2. Kwemera Amabwiriza' 
                : '2. Acceptance of Terms'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'Mukoresha DigLearners, mwemera ko:' 
                : 'By using DigLearners, you acknowledge that:'
              }
            </p>
            <div className="legal-list">
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwiyandikishije kandi mukemera amabwiriza yose yanditse aha' 
                    : 'You have read and understood all terms and conditions'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You agree to comply with all applicable laws and regulations'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose (ababyeyi b\'abana)' 
                    : 'You have the legal capacity to enter into this agreement (or parental consent for children)'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You will provide accurate and truthful information when registering'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You are responsible for maintaining the security of your account'
                  }
                </li>
              </ul>
            </div>
            <div className="legal-highlight">
              <h4>
                {currentLanguage === 'rw' 
                  ? 'Uburenganzira bw\'Ababyeyi:' 
                  : 'Parental Consent:'
                }
              </h4>
              <p>
                {currentLanguage === 'rw' 
                  ? 'Abana bafite imyaka 13 n\'inyuma bakeneye uburenganzira bw\'ababyeyi cyangwa abarinzi kugira ngo bakoreshe serivisi zacu. Mukoresha serivisi zacu, mwemera ko mwiyandikishije kandi mukemera amabwiriza yose.' 
                  : 'Children under 13 require parental or guardian consent to use our services. By allowing your child to use DigLearners, you consent to these terms on their behalf and agree to supervise their use of the platform.'
                }
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '3. Ibikurikizwa n\'Abakoresha' 
                : '3. User Responsibilities'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'Mukoresha DigLearners, mwemera ko mwiyandikishije kandi mukemera amabwiriza yose. Ibi bikurikizwa birasaba:' 
                : 'As a user of DigLearners, you have certain responsibilities. These include:'
              }
            </p>
            
            <div className="legal-list">
              <h3>
                {currentLanguage === 'rw' 
                  ? 'Ibikurikizwa by\'Abakoresha bose:' 
                  : 'Responsibilities for All Users:'
                }
              </h3>
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To use our services responsibly, ethically, and in accordance with these terms'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kutagira ibitekerezo by\'ubwoba cyangwa ibitekerezo by\'ubwoba' 
                    : 'Not to share, post, or transmit inappropriate, harmful, or offensive content'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To respect other users and maintain a positive, supportive learning environment'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To provide accurate and truthful information when registering and using the platform'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To protect your account credentials and notify us immediately of any unauthorized access'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To comply with all applicable laws and regulations'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'Not to attempt to hack, disrupt, or compromise the platform\'s security'
                  }
                </li>
              </ul>
            </div>

            <div className="legal-list">
              <h3>
                {currentLanguage === 'rw' 
                  ? 'Ibikurikizwa by\'Abanyeshuri:' 
                  : 'Responsibilities for Students:'
                }
              </h3>
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To complete assignments honestly and independently, without cheating or plagiarism'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To seek help from teachers when needed and participate actively in learning activities'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To respect teachers, fellow students, and the learning environment'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To use the platform only for educational purposes'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To follow teacher instructions and complete assigned lessons and activities'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To report any inappropriate content or behavior to teachers or parents'
                  }
                </li>
              </ul>
            </div>

            <div className="legal-list">
              <h3>
                {currentLanguage === 'rw' 
                  ? 'Ibikurikizwa by\'Abarezi:' 
                  : 'Responsibilities for Teachers:'
                }
              </h3>
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To provide quality education and support to students using the platform'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To maintain professional standards and ethical conduct at all times'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To protect student privacy and maintain confidentiality of student information'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To monitor student progress and provide appropriate feedback and support'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To create and assign appropriate educational content for their students'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To report any safety concerns or platform issues to administrators'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To ensure student accounts are used appropriately and safely'
                  }
                </li>
              </ul>
            </div>

            <div className="legal-list">
              <h3>
                {currentLanguage === 'rw' 
                  ? 'Ibikurikizwa by\'Ababyeyi:' 
                  : 'Responsibilities for Parents/Guardians:'
                }
              </h3>
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To supervise and monitor their child\'s use of the platform'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To ensure their child uses the platform appropriately and safely'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To review their child\'s progress and communicate with teachers as needed'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To report any concerns about content, safety, or platform functionality'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kugira ubwoba n\'ubwoba mu koresha serivisi zacu' 
                    : 'To ensure their child follows the platform rules and guidelines'
                  }
                </li>
              </ul>
            </div>
          </section>

          {/* Account Registration and Security */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '4. Kwiyandikisha n\'Ukuvugurura Konti' 
                : '4. Account Registration and Security'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'Kugira ngo mukoreshe DigLearners, mukeneye kwiyandikisha kandi gukora konti. Mukoresha serivisi zacu, mwemera ko:' 
                : 'To use DigLearners, you must register and create an account. By creating an account, you agree that:'
              }
            </p>
            <div className="legal-list">
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You will provide accurate, current, and complete information during registration'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You will maintain and update your information to keep it accurate and current'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You are responsible for maintaining the confidentiality of your account credentials'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You are responsible for all activities that occur under your account'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You will notify us immediately of any unauthorized use of your account'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You will not share your account credentials with others'
                  }
                </li>
              </ul>
            </div>
            <div className="legal-highlight">
              <h4>
                {currentLanguage === 'rw' 
                  ? 'Ubwoba bw\'Abanyeshuri:' 
                  : 'Student Accounts:'
                }
              </h4>
              <p>
                {currentLanguage === 'rw' 
                  ? 'Konti z\'abanyeshuri zategurwa n\'abarezi. Abanyeshuri bakoresha kode y\'iyandikisha (yateguwe n\'umwarimu) kugira ngo bashobore kwinjira. Ababyeyi bafite uburenganzira bwo gukurikira intambwe y\'abana babo.' 
                  : 'Student accounts are created by teachers. Students use a registration code (generated by their teacher) to access the platform. Parents have the right to monitor their child\'s account and progress.'
                }
              </p>
            </div>
          </section>

          {/* Privacy and Data Protection */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '5. Ubwigenge n\'Ukuvugurura Amakuru' 
                : '5. Privacy and Data Protection'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'Tugamije kurengera ubwigenge bw\'abakoresha bacu. Amakuru yose y\'abantu yandikishijwe mu nzira y\'ubwoba n\'y\'ubwoba. Reba Politiki yacu y\'Ubwigenge kugira ngo ubashe ubwoba bwose ku makuru y\'ubwigenge.' 
                : 'We are committed to protecting the privacy of our users. All personal information is handled securely and in accordance with our Privacy Policy. Please review our Privacy Policy for complete details about how we collect, use, and protect your information.'
              }
            </p>
            <div className="legal-highlight">
              <h4>
                {currentLanguage === 'rw' 
                  ? 'Ubwoba bw\'Abana:' 
                  : 'Child Safety and Privacy:'
                }
              </h4>
              <p>
                {currentLanguage === 'rw' 
                  ? 'Ubwoba n\'ubwoba bw\'abana ni intego yacu y\'ibanze. Ibyiciro byose ni by\'uburezi kandi bihuje n\'ubwoba bw\'abana. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi, kandi ntidugurisha cyangwa dushyiraho amakuru y\'abana n\'abandi bantu mu nzira y\'ubucuruzi.' 
                  : 'The safety and privacy of children is our highest priority. All content is educational and age-appropriate. We use children\'s information only for educational purposes, and we never sell or share children\'s information with third parties for commercial purposes.'
                }
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '6. Uburenganzira bw\'Ubwoba' 
                : '6. Intellectual Property'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'Amasomo yose, amashusho, ibikoresho by\'uburezi, n\'ibindi bikoresho by\'ikoranabuhanga bya DigLearners ni uburenganzira bwa DigLearners cyangwa abafatanyabikorwa babo. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi.' 
                : 'All lessons, images, educational materials, software, and other intellectual property on DigLearners are the property of DigLearners or its licensors. These materials are protected by copyright, trademark, and other intellectual property laws.'
              }
            </p>
            <div className="legal-list">
              <h3>
                {currentLanguage === 'rw' 
                  ? 'Uburenganzira bw\'Abakoresha:' 
                  : 'User Rights:'
                }
              </h3>
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You have a limited, non-exclusive, non-transferable license to use our educational content for personal, educational purposes only'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You may not copy, modify, distribute, or create derivative works from our content without permission'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You may not use our content for commercial purposes without written authorization'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Mwemera ko mwiyandikishije kandi mukemera amabwiriza yose' 
                    : 'You retain ownership of any content you create or submit to the platform (subject to our license to use it)'
                  }
                </li>
              </ul>
            </div>
            <div className="legal-list">
              <h3>
                {currentLanguage === 'rw' 
                  ? 'Ibikurikizwa:' 
                  : 'Prohibited Uses:'
                }
              </h3>
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kutagira ibitekerezo by\'ubwoba cyangwa ibitekerezo by\'ubwoba' 
                    : 'Copying, reproducing, or distributing our content without authorization'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kutagira ibitekerezo by\'ubwoba cyangwa ibitekerezo by\'ubwoba' 
                    : 'Using our content to create competing educational platforms'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kutagira ibitekerezo by\'ubwoba cyangwa ibitekerezo by\'ubwoba' 
                    : 'Removing copyright notices or other proprietary markings'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Kutagira ibitekerezo by\'ubwoba cyangwa ibitekerezo by\'ubwoba' 
                    : 'Reverse engineering or attempting to extract source code'
                  }
                </li>
              </ul>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '7. Ibikurikizwa' 
                : '7. Prohibited Activities'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'Ibikurikizwa bikurikira biratandukanye. Gukora ibi bikurikizwa bishobora gutuma konti yanyu ikurwa:' 
                : 'The following activities are strictly prohibited. Engaging in prohibited activities may result in immediate account termination:'
              }
            </p>
            <div className="legal-list">
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gushyiraho amakuru y\'ubwoba cyangwa y\'ubwoba' 
                    : 'Sharing false, misleading, or fraudulent information'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gushyiraho amakuru y\'ubwoba cyangwa y\'ubwoba' 
                    : 'Harassment, bullying, intimidation, or any form of abuse towards other users'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gushyiraho amakuru y\'ubwoba cyangwa y\'ubwoba' 
                    : 'Attempting to hack, breach, or compromise the platform\'s security or systems'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gushyiraho amakuru y\'ubwoba cyangwa y\'ubwoba' 
                    : 'Sharing personal information of other users without consent'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gushyiraho amakuru y\'ubwoba cyangwa y\'ubwoba' 
                    : 'Using the platform for commercial purposes without authorization'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gushyiraho amakuru y\'ubwoba cyangwa y\'ubwoba' 
                    : 'Posting, sharing, or transmitting inappropriate, offensive, or harmful content'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gushyiraho amakuru y\'ubwoba cyangwa y\'ubwoba' 
                    : 'Cheating, plagiarism, or academic dishonesty'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gushyiraho amakuru y\'ubwoba cyangwa y\'ubwoba' 
                    : 'Creating multiple accounts to circumvent restrictions or bans'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gushyiraho amakuru y\'ubwoba cyangwa y\'ubwoba' 
                    : 'Interfering with or disrupting the platform\'s functionality or other users\' experience'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gushyiraho amakuru y\'ubwoba cyangwa y\'ubwoba' 
                    : 'Violating any applicable laws or regulations'
                  }
                </li>
              </ul>
            </div>
          </section>

          {/* Account Termination */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '8. Gukuraho Konti' 
                : '8. Account Termination'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'Dushobora gukuraho konti y\'umukoresha niba atemera amabwiriza yacu, akora ibikurikizwa, cyangwa niba dukeneye kugira ngo dukinge ubwoba bw\'abandi bakoresha. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi.' 
                : 'We reserve the right to suspend or terminate accounts that violate these terms, engage in prohibited activities, or pose a risk to other users or the platform. We will always prioritize the safety and well-being of our users, especially children.'
              }
            </p>
            <div className="legal-list">
              <h3>
                {currentLanguage === 'rw' 
                  ? 'Inzego z\'Gukuraho Konti:' 
                  : 'Grounds for Account Termination:'
                }
              </h3>
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gukora ibikurikizwa' 
                    : 'Violation of these Terms and Conditions'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gukora ibikurikizwa' 
                    : 'Engaging in prohibited activities'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gukora ibikurikizwa' 
                    : 'Fraudulent or deceptive behavior'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gukora ibikurikizwa' 
                    : 'Threatening or harmful behavior towards other users'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gukora ibikurikizwa' 
                    : 'Repeated violations of platform rules'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Gukora ibikurikizwa' 
                    : 'Legal or regulatory requirements'
                  }
                </li>
              </ul>
            </div>
            <div className="legal-list">
              <h3>
                {currentLanguage === 'rw' 
                  ? 'Inzego z\'Gukuraho Konti:' 
                  : 'Consequences of Termination:'
                }
              </h3>
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Konti yanyu izakurwa, kandi ntimuzashobora kwinjira' 
                    : 'Your account will be deactivated, and you will lose access to the platform'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Amakuru yanyu azakomeza gusa mu nzira y\'amategeko' 
                    : 'Your data may be retained as required by law or for safety purposes'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Ntimuzashobora kwiyandikisha konti nshya niba twabujije' 
                    : 'You may be prohibited from creating new accounts if you were banned'
                  }
                </li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '9. Gukuraho Uburenganzira' 
                : '9. Limitation of Liability'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'DigLearners ni ikigo cy\'uburezi cyaha serivisi z\'uburezi mu nzira y\'ubwoba. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi.' 
                : 'DigLearners provides educational services in good faith. While we strive to provide accurate, reliable, and safe services, we cannot guarantee that the platform will be error-free, uninterrupted, or completely secure.'
              }
            </p>
            <div className="legal-list">
              <h3>
                {currentLanguage === 'rw' 
                  ? 'Gukuraho Uburenganzira:' 
                  : 'Limitations:'
                }
              </h3>
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'DigLearners ntihagira uburenganzira bwo gukuraho uburenganzira bw\'abakoresha bacu' 
                    : 'DigLearners is not liable for any indirect, incidental, or consequential damages'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'DigLearners ntihagira uburenganzira bwo gukuraho uburenganzira bw\'abakoresha bacu' 
                    : 'We are not responsible for any loss of data, profits, or opportunities'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'DigLearners ntihagira uburenganzira bwo gukuraho uburenganzira bw\'abakoresha bacu' 
                    : 'We are not liable for the actions or content of third parties'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'DigLearners ntihagira uburenganzira bwo gukuraho uburenganzira bw\'abakoresha bacu' 
                    : 'We are not responsible for technical issues, interruptions, or platform downtime'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'DigLearners ntihagira uburenganzira bwo gukuraho uburenganzira bw\'abakoresha bacu' 
                    : 'Users are responsible for their own use of the platform and any consequences thereof'
                  }
                </li>
              </ul>
            </div>
            <p>
              {currentLanguage === 'rw' 
                ? 'Mu gihe cyose, uburenganzira bwacu bwo gukuraho uburenganzira buzagabanuka ku giciro cy\'amafaranga y\'abakoresha bacu bwo gukoresha serivisi zacu.' 
                : 'To the maximum extent permitted by law, our total liability shall not exceed the amount paid by users for our services (if any).'
              }
            </p>
          </section>

          {/* Service Availability */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '10. Kuboneka kwa Serivisi' 
                : '10. Service Availability'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi.' 
                : 'We strive to provide continuous, reliable service, but we cannot guarantee that the platform will always be available, uninterrupted, or error-free. The platform may be temporarily unavailable due to maintenance, updates, technical issues, or circumstances beyond our control.'
              }
            </p>
            <div className="legal-list">
              <h3>
                {currentLanguage === 'rw' 
                  ? 'Inzego z\'Gukuraho Konti:' 
                  : 'Service Modifications:'
                }
              </h3>
              <ul>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Dushobora guhindura, gukuraho, cyangwa gukuraho serivisi zacu igihe cyose' 
                    : 'We reserve the right to modify, suspend, or discontinue any part of our services at any time'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Dushobora guhindura, gukuraho, cyangwa gukuraho serivisi zacu igihe cyose' 
                    : 'We will provide reasonable notice of significant changes when possible'
                  }
                </li>
                <li>
                  {currentLanguage === 'rw' 
                    ? 'Dushobora guhindura, gukuraho, cyangwa gukuraho serivisi zacu igihe cyose' 
                    : 'We are not liable for any inconvenience or loss resulting from service modifications'
                  }
                </li>
              </ul>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '11. Guhindura Amabwiriza' 
                : '11. Changes to Terms'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'Dushobora guhindura amabwiriza yacu igihe cyose kugira ngo dushobore guhindura serivisi zacu, amategeko, cyangwa amabwiriza. Tugomba guhagararira abakoresha ku makuru y\'ubukoresha n\'intambwe. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi.' 
                : 'We may update these Terms and Conditions from time to time to reflect changes in our services, laws, or regulations. We will notify users of significant changes through email or platform notifications. Continued use of our services after changes constitutes acceptance of the updated terms.'
            </p>
            <p>
              {currentLanguage === 'rw' 
                ? 'Itangazo ryose rigomba gukorwa mbere y\'uko guhindura, kandi ababyeyi bazamenyeshwa ku makuru y\'ubukoresha n\'intambwe.' 
                : 'All notifications will be sent in advance when possible, and parents will be notified of any changes affecting children\'s use of the platform.'
              }
            </p>
            <p>
              {currentLanguage === 'rw' 
                ? 'Niba mutemera amabwiriza y\'amabwiriza, nyamuneka mutazikoresha serivisi zacu.' 
                : 'If you do not agree to the updated terms, please discontinue use of our services.'
              }
            </p>
          </section>

          {/* Governing Law */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '12. Amategeko Agenga' 
                : '12. Governing Law'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'Iyi mabwiriza agenzwa n\'amategeko y\'u Rwanda. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi.' 
                : 'These Terms and Conditions are governed by the laws of Rwanda. Any disputes arising from these terms or your use of the platform shall be resolved in accordance with Rwandan law and in the courts of Rwanda.'
              }
            </p>
          </section>

          {/* Contact Information */}
          <section className="legal-section">
            <h2>
              {currentLanguage === 'rw' 
                ? '13. Amakuru y\'Ubufasha' 
                : '13. Contact Information'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'Niba mufite ibibazo, ibitekerezo, cyangwa ibitekerezo ku mabwiriza yacu, nyamuneka mutwandikire:' 
                : 'If you have questions, concerns, or requests regarding these Terms and Conditions, please contact us:'
              }
            </p>
            <div className="contact-info">
              <p>
                <strong>
                  {currentLanguage === 'rw' 
                    ? 'DigLearners - Ubwoba bw\'Amabwiriza' 
                    : 'DigLearners - Legal Team'
                  }
                </strong>
              </p>
              <p>
                {currentLanguage === 'rw' 
                  ? 'Kigali, Rwanda' 
                  : 'Kigali, Rwanda'
                }
              </p>
              <p>
                {currentLanguage === 'rw' 
                  ? 'Imeli: legal@diglearners.rw' 
                  : 'Email: legal@diglearners.rw'
                }
              </p>
              <p>
                {currentLanguage === 'rw' 
                  ? 'Telefone: +250 788 123 456' 
                  : 'Phone: +250 788 123 456'
                }
              </p>
              <p>
                {currentLanguage === 'rw' 
                  ? 'Igihe cyo guhagararira: Iminsi 30' 
                  : 'Response time: Within 30 days'
                }
              </p>
            </div>
          </section>

          {/* Ethical Commitment */}
          <section className="legal-section ethical-commitment">
            <h2>
              {currentLanguage === 'rw' 
                ? '14. Icyemezo cy\'Ubwoba' 
                : '14. Ethical Commitment'
              }
            </h2>
            <p>
              {currentLanguage === 'rw' 
                ? 'DigLearners yiyemeje kurengera ubwoba n\'ubwoba bw\'abana. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi.' 
                : 'DigLearners is committed to ethical practices, child safety, and educational excellence. We believe in transparency, accountability, and putting children\'s best interests first.'
              }
            </p>
            <div className="ethical-principles">
              <div className="ethical-principle">
                <h3>
                  {currentLanguage === 'rw' 
                    ? 'Ubwoba bw\'Abana' 
                    : 'Child Safety'
                  }
                </h3>
                <p>
                  {currentLanguage === 'rw' 
                    ? 'Ubwoba n\'ubwoba bw\'abana ni intego yacu y\'ibanze. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi. Ibyiciro byose ni by\'uburezi kandi bihuje n\'ubwoba bw\'abana.' 
                    : 'The safety and well-being of children is our highest priority. All content is educational and age-appropriate. We implement comprehensive safety measures to protect children online.'
                  }
                </p>
              </div>
              <div className="ethical-principle">
                <h3>
                  {currentLanguage === 'rw' 
                    ? 'Ubwoba bw\'Uburezi' 
                    : 'Educational Integrity'
                  }
                </h3>
                <p>
                  {currentLanguage === 'rw' 
                    ? 'Dukomeza ubwoba bw\'uburezi n\'ubwoba bw\'uburezi. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi.' 
                    : 'We maintain the highest standards of educational integrity and academic honesty. We promote genuine learning and discourage cheating or academic dishonesty.'
                  }
                </p>
              </div>
              <div className="ethical-principle">
                <h3>
                  {currentLanguage === 'rw' 
                    ? 'Ubwoba bw\'Abana' 
                    : 'Digital Inclusion'
                  }
                </h3>
                <p>
                  {currentLanguage === 'rw' 
                    ? 'Dukomeza kugira ngo uburezi bwo mu ikoranabuhanga baboneke ku banyeshuri bose, n\'ubwoba bw\'abana. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi.' 
                    : 'We are committed to making digital education accessible to all students, regardless of background, ability, or circumstances. We support multilingual learning and inclusive design.'
                  }
                </p>
              </div>
              <div className="ethical-principle">
                <h3>
                  {currentLanguage === 'rw' 
                    ? 'Gusobanura' 
                    : 'Transparency'
                  }
                </h3>
                <p>
                  {currentLanguage === 'rw' 
                    ? 'Dusobanura uko dukoresha amakuru y\'abana. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi. Dukoresha amakuru y\'abana gusa mu nzira y\'uburezi.' 
                    : 'We are transparent about our practices, policies, and data handling. We communicate clearly with parents, teachers, and students about how the platform works.'
                  }
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
};

export default TermsAndConditions;
