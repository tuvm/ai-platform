const ChestXray = {
  and: [
    {
      '==': [
        {
          var: 'tag.Modality',
        },
        'CR, DX, DR',
      ],
    },
    {
      '==': [
        {
          var: 'tag.BodyPart',
        },
        'Chest, Thorax',
      ],
    },
  ],
};

const SpineXray = {
  and: [
    {
      '==': [
        {
          var: 'tag.Modality',
        },
        'CR, DX, DR',
      ],
    },
    {
      '==': [
        {
          var: 'tag.BodyPart',
        },
        'Cspine, Lspine',
      ],
    },
  ],
};

const Mammography = {
  and: [
    {
      '==': [
        {
          var: 'tag.Modality',
        },
        'MG',
      ],
    },
  ],
};

const BrainCT = {
  and: [
    {
      '==': [
        {
          var: 'tag.Modality',
        },
        'CT',
      ],
    },
    {
      '==': [
        {
          var: 'tag.BodyPart',
        },
        'Brain, Head',
      ],
    },
  ],
};

const BrainMRI = {
  and: [
    {
      '==': [
        {
          var: 'tag.Modality',
        },
        'MR',
      ],
    },
    {
      '==': [
        {
          var: 'tag.BodyPart',
        },
        'Brain, Head',
      ],
    },
  ],
};

const LungCT = {
  and: [
    {
      '==': [
        {
          var: 'tag.Modality',
        },
        'CT',
      ],
    },
    {
      '==': [
        {
          var: 'tag.BodyPart',
        },
        'Chest, Thorax',
      ],
    },
  ],
};

const LiverCT = {
  and: [
    {
      '==': [
        {
          var: 'tag.Modality',
        },
        'CT',
      ],
    },
    {
      '==': [
        {
          var: 'tag.BodyPart',
        },
        'Abdomen',
      ],
    },
    {
      in: [
        'tinhmach, tinh, tm, venou',
        {
          var: 'tag.SeriesDescription',
        },
      ],
    },
  ],
};

const defaultRules = {
  ChestXray,
  SpineXray,
  Mammography,
  BrainCT,
  BrainMRI,
  LungCT,
  LiverCT,
};

export default defaultRules;
