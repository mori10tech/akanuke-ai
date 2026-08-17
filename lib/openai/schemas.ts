export type AkanukeAnalysis = {
  progress: number;

  currentImpression: string;
  targetImpression: string;

  summary: {
    headline: string;
    body: string;
  };

  afterSummary: {
    headline: string;
    body: string;
    changes: string[];
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

export const akanukeAnalysisJsonSchema = {
  type: "object",
  additionalProperties: false,

  properties: {
    progress: {
      type: "number",
    },

    currentImpression: {
      type: "string",
    },

    targetImpression: {
      type: "string",
    },

    summary: {
      type: "object",
      additionalProperties: false,

      properties: {
        headline: {
          type: "string",
        },

        body: {
          type: "string",
        },
      },

      required: [
        "headline",
        "body",
      ],
    },

    afterSummary: {
      type: "object",
      additionalProperties: false,

      properties: {
        headline: {
          type: "string",
        },

        body: {
          type: "string",
        },

        changes: {
          type: "array",
          minItems: 3,
          maxItems: 5,

          items: {
            type: "string",
          },
        },
      },

      required: [
        "headline",
        "body",
        "changes",
      ],
    },

    hair: {
      type: "object",
      additionalProperties: false,

      properties: {
        observation: {
          type: "string",
        },

        advice: {
          type: "string",
        },
      },

      required: [
        "observation",
        "advice",
      ],
    },

    eyebrows: {
      type: "object",
      additionalProperties: false,

      properties: {
        observation: {
          type: "string",
        },

        advice: {
          type: "string",
        },
      },

      required: [
        "observation",
        "advice",
      ],
    },

    skin: {
      type: "object",
      additionalProperties: false,

      properties: {
        observation: {
          type: "string",
        },

        advice: {
          type: "string",
        },
      },

      required: [
        "observation",
        "advice",
      ],
    },

    grooming: {
      type: "object",
      additionalProperties: false,

      properties: {
        observation: {
          type: "string",
        },

        advice: {
          type: "string",
        },
      },

      required: [
        "observation",
        "advice",
      ],
    },

    priorities: {
      type: "array",
      minItems: 3,
      maxItems: 3,

      items: {
        type: "object",
        additionalProperties: false,

        properties: {
          rank: {
            type: "integer",
          },

          title: {
            type: "string",
          },

          description: {
            type: "string",
          },
        },

        required: [
          "rank",
          "title",
          "description",
        ],
      },
    },

    afterDirection: {
      type: "object",
      additionalProperties: false,

      properties: {
        hair: {
          type: "string",
        },

        eyebrows: {
          type: "string",
        },

        skin: {
          type: "string",
        },

        grooming: {
          type: "string",
        },

        styling: {
          type: "string",
        },
      },

      required: [
        "hair",
        "eyebrows",
        "skin",
        "grooming",
        "styling",
      ],
    },
  },

  required: [
    "progress",
    "currentImpression",
    "targetImpression",
    "summary",
    "afterSummary",
    "hair",
    "eyebrows",
    "skin",
    "grooming",
    "priorities",
    "afterDirection",
  ],
} as const;