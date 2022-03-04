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
      or: [
        {
          in: [
            {
              var: 'tag.BodyPart',
            },
            'CHEST, THORAX',
          ],
        },
        {
          in: [
            {
              var: 'tag.BodyPartExamined',
            },
            'CHEST, THORAX',
          ],
        },
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
      or: [
        {
          in: [
            {
              var: 'tag.BodyPartExamined',
            },
            'Cspine, Lspine',
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
      or: [
        {
          in: [
            {
              var: 'tag.BodyPart',
            },
            'BRAIN, HEAD',
          ],
        },
        {
          in: [
            {
              var: 'tag.BodyPartExamined',
            },
            'BRAIN, HEAD',
          ],
        },
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
      or: [
        {
          in: [
            {
              var: 'tag.BodyPartExamined',
            },
            'BRAIN, HEAD',
          ],
        },
        {
          in: [
            {
              var: 'tag.BodyPart',
            },
            'BRAIN, HEAD',
          ],
        },
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
      or: [
        {
          in: [
            {
              var: 'tag.BodyPart',
            },
            'CHEST, THORAX',
          ],
        },
        {
          in: [
            {
              var: 'tag.BodyPartExamined',
            },
            'CHEST, THORAX',
          ],
        },
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
    // {
    //   contain: [
    //     {
    //       var: 'tag.SeriesDescription',
    //     },
    //     'tinhmach, tinh, tm, venous',
    //   ],
    // },
    {
      or: [
        {
          in: [
            {
              var: 'tag.BodyPart',
            },
            'ABDOMEN',
          ],
        },
        {
          in: [
            {
              var: 'tag.BodyPartExamined',
            },
            'ABDOMEN',
          ],
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
