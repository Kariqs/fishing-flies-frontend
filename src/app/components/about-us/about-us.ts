import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer';
import { CommonModule } from '@angular/common';

interface Value {
  emoji: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

@Component({
  selector: 'app-aboutus',
  templateUrl: './about-us.html',
  imports: [FooterComponent, CommonModule],
})
export class AboutUs {
  storyImage = 'https://images.unsplash.com/photo-1560854350-9b68a9b14b4e?w=800&q=80';

  values: Value[] = [
    {
      emoji: '🪶',
      title: 'Handcrafted Quality',
      description:
        'Every fly is tied by hand, one at a time. No shortcuts, no machines — just skilled hands and the best materials available.',
    },
    {
      emoji: '🎣',
      title: 'Angler-First Thinking',
      description:
        'We are fly fishers ourselves. Every pattern we offer has been tested on real water before it ever reaches a customer.',
    },
    {
      emoji: '🌿',
      title: 'Love for Nature',
      description:
        "Kenya's rivers and lakes are our home. We are committed to sustainable practices that protect the waters we fish.",
    },
    {
      emoji: '🤝',
      title: 'Community',
      description:
        'We support local fishing communities and share knowledge freely. A rising tide lifts all boats — and all anglers.',
    },
    {
      emoji: '✅',
      title: 'Honest Value',
      description:
        'Premium flies at fair prices. We believe every angler deserves access to quality patterns without breaking the bank.',
    },
    {
      emoji: '📦',
      title: 'Reliable Service',
      description:
        'Fast packing, careful packaging, and friendly support. We take as much pride in the experience as in the flies themselves.',
    },
  ];

  stats: Stat[] = [
    { value: '10+', label: 'Years of Craft' },
    { value: '120+', label: 'Fly Patterns' },
    { value: '3,400+', label: 'Happy Anglers' },
    { value: '100%', label: 'Hand-Tied' },
  ];

  team: TeamMember[] = [
    {
      name: 'Amiani',
      role: 'Founder & Head Fly Tier',
      bio: "A lifelong angler who turned a passion for tying into a craft. Amiani has been fishing Kenya's rivers for over two decades.",
      photo: 'https://placehold.co/200x200/dcfce7/166534?text=A',
    },
    {
      name: 'Jane Doe',
      role: 'Senior Fly Tier',
      bio: 'Jane brings meticulous precision to every pattern she ties. Her dry flies are some of the most requested in our catalogue.',
      photo: 'https://placehold.co/200x200/dcfce7/166534?text=G',
    },
    {
      name: 'John Doe',
      role: 'Patterns & R&D',
      bio: 'John spends his weekends testing new patterns on the Sagana and Thika rivers, always chasing the next great fly design.',
      photo: 'https://placehold.co/200x200/dcfce7/166534?text=D',
    },
  ];

  onStoryImageError(event: Event): void {
    const img = event.target as HTMLImageElement;

    img.src = "https://placehold.co/800x600/dcfce7/166534?text=Amiani's+Flies";
  }

  onTeamImageError(event: Event, name: string): void {
    const img = event.target as HTMLImageElement;

    img.src = `https://placehold.co/200x200/dcfce7/166534?text=${name.charAt(0)}`;
  }
}
