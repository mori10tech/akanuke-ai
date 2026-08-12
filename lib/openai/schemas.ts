export type AkanukeAnalysis = {
  progress: number;

  currentImpression: string;
  targetImpression: string;

  summary: {
    headline: string;
    body: string;
  };

  hair: {
    observation: string;
    advice: string;
  };

  eyebrows: {
    observation: string;
    advice: string;
  };

  skin: {
    observation: string;
    advice: string;
  };

  grooming: {
    observation: string;
    advice: string;
  };

  priorities: [
    {
      rank: 1;
      title: string;
      description: string;
    },
    {
      rank: 2;
      title: string;
      description: string;
    },
    {
      rank: 3;
      title: string;
      description: string;
    },
  ];

  afterDirection: {
    hair: string;
    eyebrows: string;
    skin: string;
    grooming: string;
    styling: string;
  };
};