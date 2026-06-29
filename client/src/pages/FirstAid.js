import React, { useState } from 'react';
import { FaSearch, FaHeartbeat, FaBurn, FaBandAid, FaSkullCrossbones, FaBone, FaLungs } from 'react-icons/fa';
import './FirstAid.css';

const FirstAid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);

  const firstAidGuides = [
    {
      id: 1,
      title: 'CPR (Cardiopulmonary Resuscitation)',
      category: 'Critical',
      icon: <FaHeartbeat />,
      color: '#ef4444',
      shortDesc: 'For someone who is not breathing or has no pulse',
      steps: [
        'Call emergency services (911) immediately',
        'Place the person on a firm, flat surface',
        'Kneel beside the person\'s chest',
        'Place the heel of one hand on the center of the chest, other hand on top',
        'Push hard and fast - at least 2 inches deep',
        'Perform 30 chest compressions at 100-120 per minute',
        'Give 2 rescue breaths (tilt head back, lift chin, pinch nose)',
        'Continue cycles of 30 compressions and 2 breaths until help arrives'
      ],
      warnings: [
        'Only perform if trained or guided by emergency services',
        'Do not stop until professional help arrives',
        'Ensure scene is safe before approaching'
      ]
    },
    {
      id: 2,
      title: 'Choking',
      category: 'Critical',
      icon: <FaLungs />,
      color: '#dc2626',
      shortDesc: 'When airways are blocked by food or object',
      steps: [
        'Ask "Are you choking?" - if they can\'t speak, act immediately',
        'Stand behind the person and wrap arms around their waist',
        'Make a fist with one hand and place it above the navel',
        'Grasp the fist with other hand',
        'Give quick, upward thrusts (Heimlich maneuver)',
        'Repeat until object is dislodged',
        'If person becomes unconscious, begin CPR'
      ],
      warnings: [
        'For infants, use back blows and chest thrusts instead',
        'Call 911 if choking persists',
        'Never put fingers in mouth to remove object blindly'
      ]
    },
    {
      id: 3,
      title: 'Severe Bleeding',
      category: 'Critical',
      icon: <FaBandAid />,
      color: '#b91c1c',
      shortDesc: 'Control bleeding from cuts or wounds',
      steps: [
        'Call 911 if bleeding is severe',
        'Put on gloves if available',
        'Have the person lie down and elevate the wounded area',
        'Apply direct pressure with a clean cloth or bandage',
        'Maintain pressure for 10-15 minutes without checking',
        'If blood soaks through, add more cloth on top (don\'t remove first cloth)',
        'If bleeding continues, apply pressure to artery between wound and heart',
        'Once bleeding stops, bandage the wound firmly'
      ],
      warnings: [
        'Do not remove embedded objects',
        'Don\'t use tourniquet unless life-threatening',
        'Watch for signs of shock'
      ]
    },
    {
      id: 4,
      title: 'Burns',
      category: 'Common',
      icon: <FaBurn />,
      color: '#f59e0b',
      shortDesc: 'Treatment for thermal burns',
      steps: [
        'Remove person from heat source',
        'Remove jewelry and tight clothing before swelling',
        'Cool the burn with cool (not cold) running water for 10-20 minutes',
        'Cover burn with sterile, non-stick bandage or clean cloth',
        'For minor burns, apply burn ointment',
        'Take over-the-counter pain reliever if needed',
        'Keep burn elevated if possible'
      ],
      warnings: [
        'Do NOT use ice, butter, or ointments on severe burns',
        'Seek medical attention for burns larger than 3 inches',
        'Get immediate help for burns on face, hands, feet, or genitals',
        'Watch for signs of infection'
      ]
    },
    {
      id: 5,
      title: 'Fractures (Broken Bones)',
      category: 'Common',
      icon: <FaBone />,
      color: '#8b5cf6',
      shortDesc: 'Immobilize suspected broken bones',
      steps: [
        'Don\'t move the person unless necessary',
        'Immobilize the injured area',
        'Apply ice packs to reduce swelling and pain',
        'Treat for shock if necessary (keep warm, elevate legs)',
        'For open fracture, don\'t push bone back in',
        'Cover wound with sterile dressing',
        'Splint the fracture if trained to do so',
        'Get medical help immediately'
      ],
      warnings: [
        'Never try to realign the bone',
        'Don\'t test if bone can move',
        'Watch for numbness or tingling below injury'
      ]
    },
    {
      id: 6,
      title: 'Poisoning',
      category: 'Critical',
      icon: <FaSkullCrossbones />,
      color: '#7c3aed',
      shortDesc: 'Response to toxic substance exposure',
      steps: [
        'Call Poison Control Center (1-800-222-1222) immediately',
        'Or call 911 if person is unconscious or not breathing',
        'Have the poison container with you when calling',
        'Follow instructions from poison control',
        'Do NOT induce vomiting unless told to do so',
        'If poison on skin, remove contaminated clothing',
        'Rinse skin with running water for 15-20 minutes',
        'If poison in eye, flush with water for 15-20 minutes'
      ],
      warnings: [
        'Never give anything by mouth to unconscious person',
        'Don\'t follow instructions on container for poisoning',
        'Keep the poison container for identification'
      ]
    },
    {
      id: 7,
      title: 'Heart Attack',
      category: 'Critical',
      icon: <FaHeartbeat />,
      color: '#ef4444',
      shortDesc: 'Signs: chest pain, shortness of breath, nausea',
      steps: [
        'Call 911 immediately',
        'Help person sit down and rest',
        'Loosen tight clothing',
        'If person has prescribed nitroglycerin, help them take it',
        'Give aspirin if not allergic (chew it for faster absorption)',
        'Stay with person and monitor condition',
        'Be ready to perform CPR if person becomes unconscious',
        'Continue until medical help arrives'
      ],
      warnings: [
        'Time is critical - act fast',
        'Don\'t drive to hospital yourself',
        'Don\'t give aspirin if allergic or taking blood thinners'
      ]
    },
    {
      id: 8,
      title: 'Stroke',
      category: 'Critical',
      icon: <FaBandAid />,
      color: '#dc2626',
      shortDesc: 'F.A.S.T: Face, Arms, Speech, Time',
      steps: [
        'Call 911 immediately - note the time symptoms started',
        'F - Face: Check for facial drooping (ask person to smile)',
        'A - Arms: Check if one arm drifts down (raise both arms)',
        'S - Speech: Check for slurred speech (repeat simple sentence)',
        'T - Time: Time is critical, get help fast',
        'Keep person calm and comfortable',
        'Do not give food, drink, or medication',
        'Note symptoms and when they started for medical team'
      ],
      warnings: [
        'Every minute counts in stroke treatment',
        'Do not wait to see if symptoms go away',
        'Position person with head slightly elevated'
      ]
    }
  ];

  const filteredGuides = firstAidGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(firstAidGuides.map(g => g.category))];

  return (
    <div className="first-aid-page">
      <div className="first-aid-header">
        <h2>First Aid Guide</h2>
        <p>Quick reference for emergency situations</p>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for emergency situations (e.g., burns, bleeding, CPR)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filters">
        <button 
          className={searchTerm === '' ? 'active' : ''}
          onClick={() => setSearchTerm('')}
        >
          All
        </button>
        {categories.map((category, index) => (
          <button 
            key={index}
            onClick={() => setSearchTerm(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* First Aid Cards Grid */}
      <div className="first-aid-grid">
        {filteredGuides.map((guide) => (
          <div 
            key={guide.id} 
            className="first-aid-card"
            onClick={() => setSelectedGuide(guide)}
          >
            <div className="card-icon-wrapper" style={{ backgroundColor: guide.color }}>
              {guide.icon}
            </div>
            <div className="card-content">
              <span className="category-badge">{guide.category}</span>
              <h3>{guide.title}</h3>
              <p>{guide.shortDesc}</p>
              <button className="view-guide-btn">View Guide</button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Guide Modal */}
      {selectedGuide && (
        <div className="guide-modal-overlay" onClick={() => setSelectedGuide(null)}>
          <div className="guide-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedGuide(null)}>
              &times;
            </button>
            
            <div className="guide-modal-header" style={{ backgroundColor: selectedGuide.color }}>
              <div className="modal-icon">{selectedGuide.icon}</div>
              <div>
                <h2>{selectedGuide.title}</h2>
                <p>{selectedGuide.shortDesc}</p>
              </div>
            </div>

            <div className="guide-modal-body">
              <div className="steps-section">
                <h3>Steps to Follow:</h3>
                <ol className="steps-list">
                  {selectedGuide.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="warnings-section">
                <h3>⚠️ Important Warnings:</h3>
                <ul className="warnings-list">
                  {selectedGuide.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>

              <div className="emergency-reminder">
                <strong>Remember:</strong> In life-threatening situations, always call emergency services (911) first!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="disclaimer">
        <h4>⚕️ Medical Disclaimer</h4>
        <p>
          This information is for educational purposes only and does not replace professional medical advice. 
          Always call emergency services (911) in serious situations. Consider taking a certified first aid course 
          for hands-on training.
        </p>
      </div>
    </div>
  );
};

export default FirstAid;
