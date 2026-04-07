import { motion } from 'motion/react';
import PublicLayout from '@/app/components/PublicLayout';
import { FileText, Shield, AlertCircle, BookOpen, Users, Ban, Scale, Globe, Mail, Upload, Heart } from 'lucide-react';

export default function Terms() {
  const sections = [
    {
      icon: FileText,
      title: '1. Acceptance of Terms',
      content: [
        {
          subtitle: 'Binding Agreement',
          text: 'These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and Vantalog ("we", "us", or "our"). By accessing, browsing, or using the Vantalog educational resource library platform (the "Service" or "Platform"), you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.'
        },
        {
          subtitle: 'Acceptance by Use',
          text: 'Your use of the Service constitutes your acceptance of these Terms. If you do not agree with any part of these Terms, you must not use the Service. Continued use of the Service following any modifications to these Terms will constitute your acceptance of such modifications.'
        },
        {
          subtitle: 'Age Requirement',
          text: 'By using this Service, you represent and warrant that you are at least 13 years of age. If you are under 18 years old, you should use the Service with parental or guardian supervision.'
        }
      ]
    },
    {
      icon: BookOpen,
      title: '2. Definitions',
      content: [
        {
          subtitle: 'Key Terms',
          text: '"Service" or "Platform" refers to the Vantalog educational resource library, including the website, all related services, content, and features.\n\n"Content" means all educational resources, materials, documents, articles, books, videos, images, metadata, and other information available through the Service, organized in four main categories: Digital Arts, Programming, Music Theory, and World Languages.\n\n"User" or "You" refers to any individual that accesses or uses the Service with a registered User account.\n\n"Admin" refers to authorized users with elevated privileges to upload, manage, and moderate content on the Platform.\n\n"Account" refers to the unique User or Admin account you create to access the Service.\n\n"User-Generated Content" or "UGC" means any content, including reviews, comments, ratings, or feedback that you submit through the Service.'
        }
      ]
    },
    {
      icon: Users,
      title: '3. Eligibility & Account Registration',
      content: [
        {
          subtitle: 'User Roles',
          text: 'Vantalog offers two types of accounts:\n\n• User Account: Standard access for browsing, searching, downloading, and saving educational resources.\n\n• Admin Account: Elevated access for uploading new resources, managing content, and moderating the platform. Admin access requires approval through our Admin Request process.'
        },
        {
          subtitle: 'Registration Requirements',
          text: 'To create an account, you must provide accurate, current, and complete information including your full name, valid email address, and a secure password. You agree to promptly update your account information to maintain its accuracy.'
        },
        {
          subtitle: 'Security Verification',
          text: 'All users must complete our Security Verification process upon login. This includes a verification challenge to ensure platform security and prevent unauthorized access.'
        },
        {
          subtitle: 'Account Responsibility',
          text: 'You are solely responsible for maintaining the confidentiality of your account credentials. You agree to:\n\n• Immediately notify us of any unauthorized use of your account\n• Ensure that you log out at the end of each session on shared devices\n• Not share your account credentials with others\n• Accept responsibility for all activities under your account\n\nVantalog will not be liable for any loss or damage arising from unauthorized account access.'
        }
      ]
    },
    {
      icon: BookOpen,
      title: '4. Description of Service',
      content: [
        {
          subtitle: 'What Vantalog Provides',
          text: 'Vantalog is a free educational resource library that provides:\n\n• Access to curated educational materials across four main categories:\n  - Digital Arts: Graphic design, animation, illustration, and visual arts\n  - Programming: Software development, algorithms, and computer science\n  - Music Theory: Composition, notation, harmony, and musical analysis\n  - World Languages: Language learning, linguistics, and cultural studies\n\n• Search and browse functionality\n• Resource download capabilities\n• Favorites/bookmarking system\n• Download history tracking\n• User profile management\n• Contact and support features\n• Help Center with comprehensive articles'
        },
        {
          subtitle: 'Admin Features',
          text: 'Users with approved Admin accounts have access to additional features:\n\n• Upload new educational resources\n• Manage existing content (edit, delete)\n• Review user feedback and submissions\n• Manage user access and permissions\n• View platform analytics and statistics'
        },
        {
          subtitle: 'Free Service',
          text: 'Vantalog is provided as a free service to promote educational access. We do not charge subscription fees or require payment to access resources. The Service is funded and maintained by our team to support learning and education.'
        },
        {
          subtitle: 'Availability Disclaimer',
          text: 'While we strive to provide uninterrupted access to the Service, we do not guarantee that the Service will be available at all times or error-free. The Service may experience downtime for maintenance, updates, or technical issues. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with reasonable notice when possible.'
        }
      ]
    },
    {
      icon: Shield,
      title: '5. Intellectual Property Rights',
      content: [
        {
          subtitle: 'Ownership of Content',
          text: 'All Content available through the Service, including educational resources, platform design, logos, graphics, and software, is the property of Vantalog, our content contributors, or licensed third parties. All Content is protected by copyright, trademark, and other intellectual property laws.'
        },
        {
          subtitle: 'License Granted to Users',
          text: 'Subject to your compliance with these Terms, Vantalog grants you a limited, non-exclusive, non-transferable, revocable license to:\n\n• Access and view Content through the Service for personal, non-commercial, educational use only\n• Download Content for offline educational purposes\n• Save resources to your favorites\n• Create personal notes and bookmarks\n\nThis license does not include any right to:\n\n• Resale, redistribution, or commercial use of the Service or Content\n• Mass downloading or systematic archiving of Content\n• Use of automated systems (bots, scrapers) to access the Service\n• Remove, alter, or obscure any copyright or attribution notices\n• Create derivative works based on the Content without permission\n• Share account credentials or access with others'
        },
        {
          subtitle: 'Content Attribution',
          text: 'When using downloaded Content, you must maintain proper attribution to the original creators and sources as indicated in the resource metadata. Removal of attribution information is strictly prohibited.'
        },
        {
          subtitle: 'Admin-Uploaded Content',
          text: 'Admins who upload Content to the Platform represent and warrant that they have the necessary rights, licenses, or permissions to share such Content. By uploading Content, Admins grant Vantalog a worldwide, non-exclusive, royalty-free license to store, display, and distribute the Content through the Service.'
        }
      ]
    },
    {
      icon: Ban,
      title: '6. User Conduct & Restrictions',
      content: [
        {
          subtitle: 'Prohibited Actions',
          text: 'You agree NOT to:\n\n• Copyright Infringement: Upload, share, or distribute any Content that infringes the intellectual property rights of others.\n\n• Account Sharing: Share your account credentials or allow multiple individuals to use a single account.\n\n• Automated Access: Use robots, spiders, scrapers, or other automated means to access the Service or extract data without explicit written permission.\n\n• Malicious Content: Upload viruses, malware, or any code designed to harm the Service or other users.\n\n• Harassment: Harass, threaten, impersonate, or intimidate other users.\n\n• Spam: Use the Service to send unsolicited messages or promotional content.\n\n• System Interference: Interfere with or disrupt the Service, servers, or networks.\n\n• Unauthorized Access: Attempt to gain unauthorized access to any portion of the Service or other user accounts.\n\n• False Information: Provide false, inaccurate, or misleading information during registration or use.\n\n• Illegal Activities: Use the Service for any illegal purpose or to violate any laws.\n\n• Commercial Use: Use the Service or Content for commercial purposes without written permission.'
        },
        {
          subtitle: 'Feedback & Comments Policy',
          text: 'When submitting feedback through our Contact form or Help Center:\n\n• Provide honest, constructive feedback\n• Do not include offensive, discriminatory, or inappropriate content\n• Do not include personal attacks\n• Respect the intellectual property rights of others\n\nWe reserve the right to moderate or remove any submissions that violate these guidelines.'
        }
      ]
    },
    {
      icon: Download,
      title: '7. Resource Download & Usage Rules',
      content: [
        {
          subtitle: 'Download Rights',
          text: 'Registered users may download educational resources for personal, non-commercial educational use. Downloaded resources must be used in accordance with copyright laws and any specific usage restrictions indicated in the resource metadata.'
        },
        {
          subtitle: 'Download Limits',
          text: 'To ensure fair access for all users and prevent abuse, we may implement reasonable download limits. Excessive downloading that impacts platform performance or availability may result in temporary or permanent restrictions on your account.'
        },
        {
          subtitle: 'Prohibited Distribution',
          text: 'You may NOT:\n\n• Redistribute downloaded Content to others\n• Upload downloaded Content to other platforms or file-sharing services\n• Use downloaded Content for commercial purposes\n• Modify Content and present it as original work without permission\n• Remove attribution or copyright information from downloaded Content'
        },
        {
          subtitle: 'Account Termination Effects',
          text: 'If your account is terminated (by you or by us), your license to use downloaded Content is immediately revoked. You must delete all downloaded Content from your devices. Failure to do so constitutes a violation of these Terms and applicable copyright laws.'
        }
      ]
    },
    {
      icon: Upload,
      title: '8. Admin Content Upload & Management',
      content: [
        {
          subtitle: 'Admin Responsibilities',
          text: 'Admins who upload Content to Vantalog must:\n\n• Verify they have the right to share the Content\n• Ensure Content is educational and appropriate\n• Provide accurate metadata (title, description, category)\n• Respect copyright and intellectual property laws\n• Classify Content in the appropriate category (Digital Arts, Programming, Music Theory, or World Languages)\n• Upload Content in supported file formats'
        },
        {
          subtitle: 'Content Review',
          text: 'Vantalog reserves the right to review, approve, reject, or remove any uploaded Content at our sole discretion. We may remove Content that:\n\n• Violates copyright or intellectual property rights\n• Contains inappropriate or offensive material\n• Is spam or promotional content\n• Does not meet our quality standards\n• Violates these Terms or applicable laws'
        },
        {
          subtitle: 'Admin Account Revocation',
          text: 'Admin privileges may be revoked at any time if we determine that an Admin has violated these Terms, uploaded inappropriate Content, or abused their privileges. Admin access requires approval through our Admin Request system.'
        }
      ]
    },
    {
      icon: Ban,
      title: '9. Termination & Suspension',
      content: [
        {
          subtitle: 'When We May Suspend or Terminate Accounts',
          text: 'We reserve the right to suspend or terminate your account and access to the Service immediately, without prior notice or liability, for any reason, including but not limited to:\n\n• Violation of these Terms of Service\n• Infringement of intellectual property rights\n• Fraudulent, abusive, or illegal activity\n• Sharing account credentials\n• Harassment or abuse of other users or Vantalog staff\n• Use of automated systems to access the Service\n• Uploading inappropriate or prohibited Content (for Admins)\n• Any conduct that we believe is harmful to other users, Vantalog, or third parties'
        },
        {
          subtitle: 'User-Initiated Termination',
          text: 'You may terminate your account at any time by:\n\n1. Logging into your account settings\n2. Selecting the account deletion option\n3. Following the confirmation prompts\n\nYou may also contact us at lmno1432@gmail.com to request account deletion.'
        },
        {
          subtitle: 'Effects of Termination',
          text: 'Upon termination of your account:\n\n• You will immediately lose access to all Service features\n• All downloaded Content licenses are revoked and must be deleted\n• Your account data may be deleted from our systems\n• You remain liable for any outstanding obligations\n• Certain provisions of these Terms (including intellectual property rights, disclaimers, and limitations of liability) will survive termination'
        }
      ]
    },
    {
      icon: Globe,
      title: '10. Third-Party Services & Links',
      content: [
        {
          subtitle: 'EmailJS Integration',
          text: 'Vantalog uses EmailJS to process contact form submissions, password reset requests, and admin access applications. Your email communications may be processed by EmailJS in accordance with their privacy policy and terms of service.'
        },
        {
          subtitle: 'External Links',
          text: 'The Service may contain links to third-party websites or resources. These links are provided for your convenience only. Vantalog does not endorse and is not responsible for:\n\n• The content, products, or services offered by third-party sites\n• The privacy practices of external websites\n• Any damage or loss caused by your use of third-party sites\n\nYour use of third-party websites is at your own risk and subject to their terms and conditions.'
        },
        {
          subtitle: 'No Responsibility Disclaimer',
          text: 'Vantalog expressly disclaims any responsibility or liability for third-party content, services, or websites. We do not monitor, verify, or control third-party content.'
        }
      ]
    },
    {
      icon: AlertCircle,
      title: '11. Disclaimer of Warranties',
      content: [
        {
          subtitle: '"As Is" and "As Available" Basis',
          text: 'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, VANTALOG DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:\n\n• Warranties of merchantability, fitness for a particular purpose, and non-infringement\n• Warranties that the Service will be uninterrupted, timely, secure, or error-free\n• Warranties regarding the accuracy, completeness, or reliability of any Content\n• Warranties that defects will be corrected\n• Warranties regarding the results obtained from use of the Service\n\nYOU USE THE SERVICE AT YOUR OWN RISK.'
        },
        {
          subtitle: 'Content Accuracy Disclaimer',
          text: 'While we strive to provide accurate educational Content, we do not guarantee that all Content is accurate, complete, up-to-date, or free from errors. Educational content is provided for informational purposes only and should not be considered professional advice. Always verify critical information with authoritative sources.'
        },
        {
          subtitle: 'Availability Disclaimer',
          text: 'We do not guarantee that the Service will be available 100% of the time. The Service may experience downtime due to maintenance, updates, technical issues, or circumstances beyond our control. We are not liable for any interruption or unavailability of the Service.'
        },
        {
          subtitle: 'Educational Purpose Only',
          text: 'Vantalog is designed for educational purposes. The Content and resources provided are intended to support learning and should not replace professional education, certification programs, or expert advice in specialized fields.'
        }
      ]
    },
    {
      icon: Scale,
      title: '12. Limitation of Liability',
      content: [
        {
          subtitle: 'Caps on Damages',
          text: 'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, VANTALOG, ITS TEAM MEMBERS, OFFICERS, EMPLOYEES, AFFILIATES, AND SERVICE PROVIDERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:\n\n• Loss of data or educational materials\n• Loss of use or access to the Service\n• Service interruptions or downtime\n• Damages arising from reliance on Content\n• Damages from unauthorized account access\n• Cost of substitute services\n\nTHIS LIMITATION APPLIES WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER BASIS, EVEN IF VANTALOG HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.'
        },
        {
          subtitle: 'Maximum Liability Cap',
          text: 'IN NO EVENT SHALL VANTALOG\'S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, AND CAUSES OF ACTION EXCEED $100 USD.'
        },
        {
          subtitle: 'Jurisdictional Variations',
          text: 'SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN WARRANTIES OR DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU. IN SUCH JURISDICTIONS, VANTALOG\'S LIABILITY WILL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.'
        }
      ]
    },
    {
      icon: Shield,
      title: '13. Indemnification',
      content: [
        {
          subtitle: 'Your Responsibility',
          text: 'You agree to indemnify, defend, and hold harmless Vantalog, its team members, officers, employees, affiliates, and service providers from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys\' fees) arising from or relating to:\n\n• Your violation of these Terms of Service\n• Your violation of any law or regulation\n• Your violation of any rights of a third party, including intellectual property rights\n• Your use or misuse of the Service\n• Content you upload (for Admins)\n• Your account credentials being used by another person\n• Feedback or communications you submit\n\nThis indemnification obligation will survive termination of your account and these Terms.'
        }
      ]
    },
    {
      icon: Scale,
      title: '14. Governing Law & Jurisdiction',
      content: [
        {
          subtitle: 'Applicable Law',
          text: 'These Terms and your use of the Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.'
        },
        {
          subtitle: 'Dispute Resolution',
          text: 'We encourage users to contact us first to resolve any disputes informally through our support email: lmno1432@gmail.com. Most issues can be resolved through open communication and cooperation.'
        },
        {
          subtitle: 'Legal Actions',
          text: 'If informal resolution fails, any legal action arising from these Terms shall be resolved in accordance with applicable law and jurisdiction requirements.'
        }
      ]
    },
    {
      icon: FileText,
      title: '15. Changes to Terms',
      content: [
        {
          subtitle: 'Right to Modify',
          text: 'Vantalog reserves the right to modify, update, or replace these Terms at any time. We will make reasonable efforts to notify users of material changes.'
        },
        {
          subtitle: 'Notification Method',
          text: 'We will notify you of changes to these Terms by:\n\n• Posting the updated Terms on this page with a revised "Last Updated" date\n• Sending an email notification to your registered email address (for significant changes)\n• Displaying a notice on the Service homepage\n\nIt is your responsibility to review these Terms periodically for changes.'
        },
        {
          subtitle: 'Continued Use = Acceptance',
          text: 'Your continued use of the Service after any changes to these Terms constitutes your acceptance of the new Terms. If you do not agree with the modified Terms, you must stop using the Service and may terminate your account.'
        }
      ]
    },
    {
      icon: FileText,
      title: '16. General Provisions',
      content: [
        {
          subtitle: 'Entire Agreement',
          text: 'These Terms, together with our Privacy Policy, constitute the entire agreement between you and Vantalog regarding the Service and supersede all prior agreements and understandings.'
        },
        {
          subtitle: 'Severability',
          text: 'If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.'
        },
        {
          subtitle: 'No Waiver',
          text: 'Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.'
        },
        {
          subtitle: 'Assignment',
          text: 'You may not assign or transfer these Terms or your account without our prior written consent. Vantalog may assign or transfer these Terms at any time.'
        },
        {
          subtitle: 'Force Majeure',
          text: 'Vantalog shall not be liable for any failure to perform due to causes beyond our reasonable control, including acts of God, natural disasters, war, terrorism, riots, cyber attacks, pandemics, power failures, or internet service disruptions.'
        }
      ]
    },
    {
      icon: Mail,
      title: '17. Contact Information',
      content: [
        {
          subtitle: 'Support & Legal Inquiries',
          text: 'For questions, concerns, or legal inquiries regarding these Terms of Service, please contact us at:\n\nVantalog Support Team\nEmail: lmno1432@gmail.com\nSubject Line: Terms of Service Inquiry\n\nFor urgent legal matters, please mark your communication as "URGENT: Legal Matter" in the subject line.\n\nWe will respond to your inquiry within 5-7 business days.'
        },
        {
          subtitle: 'Admin Access Requests',
          text: 'To request Admin privileges, use the Admin Request form accessible from the login page. All admin requests are reviewed by our team and processed within 24-48 hours.'
        }
      ]
    }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center size-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-lg mb-6">
              <Scale className="size-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These terms govern your use of the Vantalog educational resource library. Please read carefully before using our services.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <FileText className="size-4" />
              Last Updated: February 15, 2026
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-8 mb-12 text-white shadow-xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertCircle className="size-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Important Legal Agreement</h3>
                <p className="text-purple-50 leading-relaxed">
                  By using Vantalog, you agree to be legally bound by these Terms of Service. These terms contain important 
                  information about your rights and obligations, including limitations of liability and appropriate use of 
                  educational resources. If you do not agree with these terms, you must not use the Service.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 size-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md">
                      <section.icon className="size-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                </div>
                <div className="px-8 py-6 space-y-6">
                  {section.content.map((item, idx) => (
                    <div key={idx} className="space-y-3">
                      {item.subtitle && (
                        <h3 className="text-lg font-semibold text-purple-600">{item.subtitle}</h3>
                      )}
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-10 text-center text-white shadow-2xl"
          >
            <Mail className="size-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Questions About These Terms?</h2>
            <p className="text-purple-50 text-lg mb-8 max-w-2xl mx-auto">
              We're here to help. If you have any questions or concerns about our Terms of Service, 
              please don't hesitate to contact us.
            </p>
            <a
              href="mailto:lmno1432@gmail.com?subject=Terms%20of%20Service%20Inquiry%20-%20Vantalog"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl"
            >
              <Mail className="size-5" />
              Contact Support Team
            </a>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}