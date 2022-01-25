const ChestXray = {
  and: [
    {
      in: [
        {
          var: 'tag.Modality',
        },
        'CR, DX, DR',
      ],
    },
    {
      in: [
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
      in: [
        {
          var: 'tag.Modality',
        },
        'CR, DX, DR',
      ],
    },
    {
      in: [
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
      in: [
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
      in: [
        {
          var: 'tag.Modality',
        },
        'CT',
      ],
    },
    {
      in: [
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
      in: [
        {
          var: 'tag.Modality',
        },
        'MR',
      ],
    },
    {
      in: [
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
      in: [
        {
          var: 'tag.Modality',
        },
        'CT',
      ],
    },
    {
      in: [
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
      in: [
        {
          var: 'tag.Modality',
        },
        'CT',
      ],
    },
    {
      in: [
        {
          var: 'tag.BodyPart',
        },
        'Abdomen',
      ],
    },
    {
      contain: [
        {
          var: 'tag.SeriesDescription',
        },
        'tinhmach, tinh, tm, venou',
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
