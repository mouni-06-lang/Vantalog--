import { motion } from 'motion/react';
import PublicLayout from '@/app/components/PublicLayout';
import { Shield, Lock, Eye, Users, FileText, Globe, Mail, Database, UserCheck, AlertTriangle } from 'lucide-react';

export default function Privacy() {
  const sections = [
    {
      icon: FileText,
      title: '1. Introduction & Scope',
      content: [
        {
          subtitle: 'Purpose of this Privacy Policy',
          text: 'This Privacy Policy describes how Vantalog ("we", "us", or "our") collects, uses, and protects your personal information when you use our educational resource library platform. We are committed to ensuring that your privacy is protected and that we comply with applicable data protection laws. This platform is NOT intended for collecting Personally Identifiable Information (PII) or sensitive data beyond what is necessary for educational resource management.'
        },
        {
          subtitle: 'Who This Policy Applies To',
          text: 'This policy applies to all visitors, registered users (with User or Admin accounts), and anyone who accesses or uses the Vantalog platform, including our website and all related services.'
        },
        {
          subtitle: 'Platform Covered',
          text: 'This Privacy Policy covers the Vantalog educational resource library and all associated services, including user authentication, resource management, contact forms, password reset functionality, and admin request processing.'
        }
      ]
    },
    {
      icon: Users,
      title: '2. Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you create an account, we collect:\n\n• Full name\n• Email address\n• Password (encrypted and never stored in plain text)\n• Account type (User or Admin)\n\nFor Admin requests, we additionally collect:\n\n• Display name preference\n• Reason for admin access (submitted through admin request form)'
        },
        {
          subtitle: 'Account & Usage Data',
          text: 'We collect information about how you use Vantalog:\n\n• Download history\n• Favorite/bookmarked resources\n• Search queries\n• Browsing activity within the platform\n• Resource access patterns\n• Profile preferences and settings'
        },
        {
          subtitle: 'Technical Data',
          text: 'We automatically collect certain technical information:\n\n• IP address\n• Browser type and version\n• Device information and operating system\n• Access times and dates\n• Pages visited and time spent\n• Referral sources\n• Session information'
        },
        {
          subtitle: 'Communications Data',
          text: 'When you contact us through our Contact form or submit requests:\n\n• Email content and attachments\n• Timestamp of submissions\n• Subject matter and inquiry type\n• Support ticket history\n\nNote: We use EmailJS to process form submissions, password resets, and admin requests. Your communications may be temporarily processed by EmailJS in accordance with their privacy policy.'
        },
        {
          subtitle: 'Content Uploaded by Admins',
          text: 'For users with Admin privileges:\n\n• Educational resources uploaded\n• Resource metadata (titles, descriptions, categories)\n• File types and sizes\n• Upload timestamps and modification history'
        }
      ]
    },
    {
      icon: Eye,
      title: '3. How Information Is Collected',
      content: [
        {
          subtitle: 'Direct User Input',
          text: 'Information you provide when:\n\n• Registering for a User or Admin account\n• Updating your profile information\n• Using the Contact form\n• Submitting password reset requests\n• Applying for admin access through the Admin Request form\n• Uploading resources (Admin users only)\n• Saving favorites or creating bookmarks'
        },
        {
          subtitle: 'Automatic Collection',
          text: 'We automatically collect certain information through:\n\n• Browser cookies and local storage\n• Server logs and access records\n• Session tracking\n• Usage analytics\n• Security verification systems'
        },
        {
          subtitle: 'Third-Party Services',
          text: 'We use EmailJS to process email communications including:\n\n• Contact form submissions\n• Password reset emails\n• Admin access request notifications\n• System notifications\n\nEmailJS may temporarily process your email and form data in accordance with their privacy policy and terms of service.'
        }
      ]
    },
    {
      icon: Lock,
      title: '4. Purpose of Data Use',
      content: [
        {
          subtitle: 'How We Use Your Information',
          text: 'We use your information for the following purposes:\n\n• Account Creation & Authentication: To create and manage your account, verify your identity through our Security Verification system, and provide secure access to the platform.\n\n• Service Provision: To provide access to our four main categories of educational resources (Digital Arts, Programming, Music Theory, World Languages), enable downloads, manage favorites, and deliver platform features.\n\n• Personalization: To customize your experience, track your download history, remember your preferences, and provide a tailored user dashboard.\n\n• Communications: To send you service-related notifications, respond to contact form inquiries, process password reset requests, handle admin access applications, and provide support.\n\n• Admin Features: To enable authorized users to upload and manage educational resources, review submissions, and moderate content.\n\n• Platform Improvement: To analyze usage patterns, understand user needs, identify popular resources, improve search functionality, and enhance user experience.\n\n• Security & Protection: To prevent unauthorized access, enforce our Security Verification process, detect and prevent abuse, protect against spam and malicious activity, and ensure platform integrity.\n\n• Legal Compliance: To comply with applicable laws, respond to legal requests, and enforce our Terms of Service.'
        }
      ]
    },
    {
      icon: Globe,
      title: '5. Cookies & Local Storage',
      content: [
        {
          subtitle: 'Types of Cookies We Use',
          text: 'Essential Cookies:\n• Authentication tokens for login sessions\n• Security verification state\n• Session management\n• User preferences\n\nFunctional Cookies:\n• Language and display preferences\n• Search history (local)\n• User interface settings\n• Navigation preferences\n\nWe DO NOT use:\n• Advertising or tracking cookies for marketing\n• Third-party analytics cookies (e.g., Google Analytics)\n• Social media tracking pixels'
        },
        {
          subtitle: 'Local Storage',
          text: 'We use browser local storage to:\n\n• Remember your login state\n• Store user preferences\n• Cache frequently accessed data for better performance\n• Maintain application state between sessions\n\nYou can clear local storage through your browser settings, though this may require you to log in again and reset your preferences.'
        },
        {
          subtitle: 'Cookie Management',
          text: 'You can control cookies through your browser settings. Most browsers allow you to refuse cookies or delete existing cookies. However, disabling essential cookies will prevent you from logging in and using authenticated features of Vantalog.'
        }
      ]
    },
    {
      icon: Shield,
      title: '6. Data Sharing & Disclosure',
      content: [
        {
          subtitle: 'EmailJS Integration',
          text: 'We share limited information with EmailJS (our email service provider) to process:\n\n• Contact form submissions\n• Password reset requests\n• Admin access applications\n• System notifications\n\nEmailJS temporarily processes your email address, name, and message content to deliver these communications. EmailJS is contractually obligated to protect your data and use it only for email delivery purposes.'
        },
        {
          subtitle: 'We Do NOT Sell Your Data',
          text: 'Vantalog does NOT sell, rent, or trade your personal information to third parties for marketing purposes. We do NOT share your data with advertisers or data brokers.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information when required by law, court order, subpoena, or other legal process, or when we believe in good faith that disclosure is necessary to:\n\n• Protect our rights or property\n• Protect user safety or public safety\n• Investigate fraud or security breaches\n• Respond to government requests\n• Enforce our Terms of Service'
        },
        {
          subtitle: 'Admin-Uploaded Content',
          text: 'Resources uploaded by Admin users are made available to all platform users. Admin-uploaded content may include attribution information visible to users downloading resources.'
        },
        {
          subtitle: 'Public Information',
          text: 'Your name may be visible in your profile. You can control what information is displayed through your account settings. Download history and favorites are private and not shared with other users.'
        }
      ]
    },
    {
      icon: Lock,
      title: '7. Data Storage & Security',
      content: [
        {
          subtitle: 'Where Data Is Stored',
          text: 'Your data is stored securely using industry-standard practices:\n\n• User account data: Encrypted database storage\n• Passwords: One-way encrypted (hashed) and never stored in plain text\n• Session data: Secure token-based authentication\n• Uploaded resources: Secure file storage with access controls'
        },
        {
          subtitle: 'Security Measures',
          text: 'We implement multiple layers of security to protect your information:\n\n• Encryption: Data transmission protected by SSL/TLS encryption (HTTPS)\n• Authentication: Multi-step Security Verification process for all logins\n• Password Security: Industry-standard password hashing (never stored in plain text)\n• Access Controls: Role-based permissions (User vs. Admin)\n• Session Security: Secure session tokens with automatic expiration\n• Security Monitoring: Regular monitoring for suspicious activity\n• Regular Updates: Platform security patches and updates'
        },
        {
          subtitle: 'Security Verification Process',
          text: 'All users must complete our Security Verification challenge when logging in. This additional security layer helps protect your account from unauthorized access and bot attacks.'
        },
        {
          subtitle: 'Your Responsibility',
          text: 'You are responsible for:\n\n• Keeping your password confidential and secure\n• Using a strong, unique password\n• Not sharing your account credentials\n• Logging out on shared devices\n• Reporting any suspicious activity immediately\n• Enabling security features in your browser'
        },
        {
          subtitle: 'No Absolute Guarantee',
          text: 'While we implement strong security measures, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data. You use our platform at your own risk.'
        }
      ]
    },
    {
      icon: Users,
      title: '8. Your Privacy Rights',
      content: [
        {
          subtitle: 'Access Your Personal Data',
          text: 'You have the right to:\n\n• View your account information in your profile\n• Review your download history\n• See your saved favorites\n• Access your account settings\n\nTo request a complete copy of all data we hold about you, contact us at lmno1432@gmail.com with "Data Access Request" in the subject line.'
        },
        {
          subtitle: 'Rectification (Correct Your Data)',
          text: 'You can update most of your information directly:\n\n• Edit your profile information\n• Change your email address\n• Update your display name\n• Modify your preferences\n\nFor assistance with corrections, contact our support team.'
        },
        {
          subtitle: 'Erasure (Delete Your Data)',
          text: 'You have the right to request deletion of your personal data:\n\n• Delete your account through account settings\n• Request account deletion via email to lmno1432@gmail.com\n• Subject line: "Account Deletion Request"\n\nNote: We may retain certain information for legal compliance or legitimate business purposes (e.g., preventing fraud, resolving disputes).'
        },
        {
          subtitle: 'Data Portability',
          text: 'You have the right to receive your personal data in a structured, machine-readable format. Contact us to request data export.\n\nWe can provide:\n\n• Account information (JSON or CSV format)\n• Download history\n• Favorites list\n• Profile data'
        },
        {
          subtitle: 'Withdraw Consent',
          text: 'You can withdraw consent for data processing by:\n\n• Deleting your account\n• Contacting us to opt-out of specific data uses\n• Disabling cookies in your browser\n\nWithdrawing consent may limit your ability to use certain platform features.'
        },
        {
          subtitle: 'Object to Processing',
          text: 'You have the right to object to our processing of your personal data for specific purposes. Contact us at lmno1432@gmail.com to exercise this right.'
        }
      ]
    },
    {
      icon: Database,
      title: '9. Data Retention',
      content: [
        {
          subtitle: 'How Long We Keep Your Data',
          text: 'We retain your personal information for as long as necessary to provide services and fulfill the purposes outlined in this Privacy Policy:\n\n• Active Accounts: Data retained while your account is active\n• Inactive Accounts: May be deleted after 2 years of inactivity (with prior email notification)\n• Deleted Accounts: Most data deleted within 30 days of account deletion\n• Legal Requirements: Some data retained longer if required by law'
        },
        {
          subtitle: 'What Happens When You Delete Your Account',
          text: 'When you delete your account:\n\n• Your profile information is removed\n• Your download history is deleted\n• Your favorites are removed\n• Your login credentials are permanently deleted\n• Admin-uploaded content may be retained (attributed to "Former Admin")\n• Some data may be retained for legal compliance (e.g., security logs)'
        },
        {
          subtitle: 'Backup and Recovery',
          text: 'We maintain secure backups for disaster recovery purposes. Deleted data may persist in backups for up to 90 days before being permanently removed.'
        }
      ]
    },
    {
      icon: UserCheck,
      title: '10. Children\'s Privacy (COPPA Compliance)',
      content: [
        {
          subtitle: 'Age Requirements',
          text: 'Vantalog is designed for users aged 13 and older. We do not knowingly collect personal information from children under 13 years of age without parental consent.\n\nIf you are under 13:\n• Do not create an account\n• Do not provide any personal information\n• Ask a parent or guardian to use the service on your behalf'
        },
        {
          subtitle: 'Parental Consent for Minors',
          text: 'Users aged 13-17 should use Vantalog with parental supervision and consent. Parents or guardians should:\n\n• Review this Privacy Policy\n• Monitor their child\'s account usage\n• Contact us with any concerns about privacy\n• Request account deletion if desired'
        },
        {
          subtitle: 'If We Learn of Unauthorized Child Data',
          text: 'If we become aware that we have collected personal information from a child under 13 without proper parental consent, we will take immediate steps to delete that information. If you believe we have inadvertently collected information from a child under 13, please contact us immediately at lmno1432@gmail.com.'
        }
      ]
    },
    {
      icon: Globe,
      title: '11. Third-Party Services',
      content: [
        {
          subtitle: 'EmailJS',
          text: 'Vantalog uses EmailJS to process and send emails for:\n\n• Contact form submissions\n• Password reset requests\n• Admin access request notifications\n• System communications\n\nWhen you submit a form, your data is temporarily processed by EmailJS to deliver the email. EmailJS does not permanently store your personal information and uses it only for email delivery. For more information, review EmailJS\'s privacy policy at https://www.emailjs.com/legal/privacy-policy/'
        },
        {
          subtitle: 'External Links',
          text: 'Vantalog may contain links to external educational resources or websites. This Privacy Policy applies only to information collected by Vantalog. We are not responsible for the privacy practices of external websites.\n\nWhen you click on external links:\n\n• You leave the Vantalog platform\n• The external site\'s privacy policy applies\n• We do not control or monitor third-party sites\n• Review the privacy policy of any external site you visit'
        },
        {
          subtitle: 'No Third-Party Tracking',
          text: 'We do NOT use:\n\n• Google Analytics or similar tracking services\n• Facebook Pixel or social media trackers\n• Advertising networks or remarketing tools\n• Third-party data brokers\n\nYour activity on Vantalog is NOT tracked for advertising purposes.'
        }
      ]
    },
    {
      icon: Globe,
      title: '12. International Data Considerations',
      content: [
        {
          subtitle: 'Data Processing Location',
          text: 'Vantalog operates as a web-based platform accessible globally. Your data may be processed and stored in various locations depending on our hosting infrastructure.\n\nWe ensure appropriate safeguards are in place when data is transferred or processed internationally.'
        },
        {
          subtitle: 'GDPR Compliance (EU Users)',
          text: 'If you are located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR):\n\n• Right to be informed about data collection\n• Right to access your personal data\n• Right to rectification of inaccurate data\n• Right to erasure ("right to be forgotten")\n• Right to restrict processing\n• Right to data portability\n• Right to object to processing\n• Rights related to automated decision making\n\nTo exercise these rights, contact us at lmno1432@gmail.com.'
        },
        {
          subtitle: 'CCPA Compliance (California Users)',
          text: 'If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):\n\n• Right to know what personal information is collected\n• Right to know if personal information is sold or disclosed\n• Right to opt-out of the sale of personal information (Note: We do NOT sell personal information)\n• Right to deletion of personal information\n• Right to non-discrimination for exercising privacy rights'
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: '13. Data Breach Notification',
      content: [
        {
          subtitle: 'Our Commitment',
          text: 'In the unlikely event of a data breach that affects your personal information, we will:\n\n• Investigate the breach immediately\n• Take steps to contain and remedy the breach\n• Notify affected users via email within 72 hours\n• Provide information about what data was affected\n• Advise on protective steps you should take\n• Report to relevant authorities as required by law'
        },
        {
          subtitle: 'What You Should Do',
          text: 'If you suspect a security breach or unauthorized access to your account:\n\n• Change your password immediately\n• Review your account activity for suspicious actions\n• Contact us at lmno1432@gmail.com with subject "Security Concern"\n• Monitor your download history and favorites\n• Report any unusual activity'
        }
      ]
    },
    {
      icon: FileText,
      title: '14. Policy Updates',
      content: [
        {
          subtitle: 'How You Will Be Notified',
          text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:\n\n• Posting the updated policy on this page with a revised "Last Updated" date\n• Sending an email notification to your registered email address (for significant changes)\n• Displaying a prominent notice on the platform homepage\n• Requiring acknowledgment of changes for certain updates'
        },
        {
          subtitle: 'Effective Date',
          text: 'This Privacy Policy is effective as of February 15, 2026. Your continued use of the platform after any changes indicates your acceptance of the updated Privacy Policy.\n\nIf you do not agree with the updated policy:\n\n• You may delete your account\n• Contact us to discuss concerns\n• Discontinue use of the platform'
        },
        {
          subtitle: 'Review Responsibility',
          text: 'It is your responsibility to review this Privacy Policy periodically. We recommend checking for updates whenever you log in or at least once every 6 months.'
        }
      ]
    },
    {
      icon: Mail,
      title: '15. Contact Information',
      content: [
        {
          subtitle: 'Privacy Inquiries',
          text: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:\n\nVantalog Privacy Team\nEmail: lmno1432@gmail.com\nSubject Line: Privacy Inquiry - Vantalog\n\nWe will respond to your inquiry within 30 days of receipt. For urgent privacy matters, please clearly mark your communication as "URGENT: Privacy Matter" in the subject line.'
        },
        {
          subtitle: 'Specific Privacy Requests',
          text: 'For specific privacy-related requests, use these subject lines:\n\n• "Data Access Request" - To request a copy of your data\n• "Account Deletion Request" - To delete your account\n• "Data Correction Request" - To correct inaccurate information\n• "Data Export Request" - To receive your data in portable format\n• "Privacy Rights Exercise" - To exercise GDPR/CCPA rights\n• "Security Concern" - To report security issues'
        },
        {
          subtitle: 'Data Protection Contact',
          text: 'For matters specifically related to data protection compliance (GDPR, CCPA, etc.), you may contact us at:\n\nEmail: lmno1432@gmail.com\nSubject: ATTN: Data Protection Officer\n\nInclude your account email, specific concern, and preferred resolution in your message.'
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
              <Shield className="size-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is critically important to us. This policy explains how we collect, use, protect, and handle your personal information.
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
                <Shield className="size-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Your Data Protection Rights</h3>
                <p className="text-purple-50 leading-relaxed">
                  Vantalog is committed to protecting your privacy and ensuring transparency in how we handle your data. 
                  We comply with GDPR, CCPA, and other applicable data protection regulations. You have the right to 
                  access, correct, delete, or export your personal data at any time. This platform is NOT intended for 
                  collecting Personally Identifiable Information (PII) or sensitive data beyond what is necessary for 
                  educational resource management. We do NOT sell your data to third parties.
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
            <h2 className="text-3xl font-bold mb-4">Questions About Your Privacy?</h2>
            <p className="text-purple-50 text-lg mb-8 max-w-2xl mx-auto">
              We're here to help. If you have any questions, concerns, or would like to exercise your data protection rights, 
              please don't hesitate to contact us.
            </p>
            <a
              href="mailto:lmno1432@gmail.com?subject=Privacy%20Inquiry%20-%20Vantalog"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl"
            >
              <Mail className="size-5" />
              Contact Privacy Team
            </a>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
