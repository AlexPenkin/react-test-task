import { postsApiToFrontAdapter } from './postsApiToFrontAdapter';

describe('postsApiToFrontAdapter', () => {
  it('should return proper data', () => {
    const data = {
      page: 1,
      posts: [
        {
          id: 'post62496c7559c60_1478dfbf',
          from_name: 'Isidro Schuett',
          from_id: 'user_16',
          message:
            'recommendation ministry freedom product galaxy pedestrian flower whip ballot traction opposition crosswalk survival sulphur waste sensation field angel skeleton jurisdiction access tract cheese elite opposition gift',
          type: 'status',
          created_time: '2022-04-03T06:08:15+00:00'
        },
        {
          id: 'post62496c7559c6e_856f61f2',
          from_name: 'Nydia Croff',
          from_id: 'user_2',
          message:
            'wisecrack treasurer undertake shout braid extension pursuit conflict company boy train recognize fountain',
          type: 'status',
          created_time: '2022-04-03T02:33:08+00:00'
        },
        {
          id: 'post62496c7559c72_aac1cf19',
          from_name: 'Leonarda Schult',
          from_id: 'user_3',
          message:
            'default sex future disk rule golf cherry move desert critic excuse introduce memorandum fight spray electron stand plaster electron habitat pardon cause bullet south museum notice thin grimace march plain pavement rehabilitation waste rush bracket merchant disk suntan confront eye water revolution sailor clerk morning contract agile sailor contrary carry retain conductor orchestra delete permission waist extension kill west point survival rehabilitation press plane braid grand courage angel withdrawal mosque highway extend borrow calculation reckless consumption mail dragon feminine breast drama surround rider chest pain rank rush',
          type: 'status',
          created_time: '2022-04-02T20:33:35+00:00'
        },
        {
          id: 'post62496c7559c7d_ca0b7e49',
          from_name: 'Leonarda Schult',
          from_id: 'user_3',
          message:
            'computer achievement hand cope secretion water dimension smoke stain trench reveal definite correction fill rank attention avant-garde banana herb point definition resort drag humanity adventure braid assessment constitution preparation abbey',
          type: 'status',
          created_time: '2022-04-02T15:24:31+00:00'
        }
      ]
    };

    const expected = {
      page: 1,
      posts: {
        'Isidro Schuett': [
          {
            created_time: '2022-04-03T06:08:15+00:00',
            from_id: 'user_16',
            from_name: 'Isidro Schuett',
            id: 'post62496c7559c60_1478dfbf',
            message:
              'recommendation ministry freedom product galaxy pedestrian flower whip ballot traction opposition crosswalk survival sulphur waste sensation field angel skeleton jurisdiction access tract cheese elite opposition gift',
            type: 'status'
          }
        ],
        'Leonarda Schult': [
          {
            created_time: '2022-04-02T20:33:35+00:00',
            from_id: 'user_3',
            from_name: 'Leonarda Schult',
            id: 'post62496c7559c72_aac1cf19',
            message:
              'default sex future disk rule golf cherry move desert critic excuse introduce memorandum fight spray electron stand plaster electron habitat pardon cause bullet south museum notice thin grimace march plain pavement rehabilitation waste rush bracket merchant disk suntan confront eye water revolution sailor clerk morning contract agile sailor contrary carry retain conductor orchestra delete permission waist extension kill west point survival rehabilitation press plane braid grand courage angel withdrawal mosque highway extend borrow calculation reckless consumption mail dragon feminine breast drama surround rider chest pain rank rush',
            type: 'status'
          },
          {
            created_time: '2022-04-02T15:24:31+00:00',
            from_id: 'user_3',
            from_name: 'Leonarda Schult',
            id: 'post62496c7559c7d_ca0b7e49',
            message:
              'computer achievement hand cope secretion water dimension smoke stain trench reveal definite correction fill rank attention avant-garde banana herb point definition resort drag humanity adventure braid assessment constitution preparation abbey',
            type: 'status'
          }
        ],
        'Nydia Croff': [
          {
            created_time: '2022-04-03T02:33:08+00:00',
            from_id: 'user_2',
            from_name: 'Nydia Croff',
            id: 'post62496c7559c6e_856f61f2',
            message:
              'wisecrack treasurer undertake shout braid extension pursuit conflict company boy train recognize fountain',
            type: 'status'
          }
        ]
      }
    };

    expect(postsApiToFrontAdapter(data)).toEqual(expected);
  });
});
