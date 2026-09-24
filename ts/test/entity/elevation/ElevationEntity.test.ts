

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FreeElevationSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ElevationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_ELEVATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_ELEVATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeElevationSDK.test()
    const ent = testsdk.Elevation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_ELEVATION_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'elevation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"elevation":{"a":true,"h":"Elevation","n":"elevation","r":false,"sh":"Elevation in meters","t":"`$NUMBER`","key$":"elevation","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"latitude":{"a":true,"h":"Latitude","n":"latitude","r":false,"sh":"Latitude of the point","t":"`$NUMBER`","key$":"latitude","index$":2},"longitude":{"a":true,"h":"Longitude","n":"longitude","r":false,"sh":"Longitude of the point","t":"`$NUMBER`","key$":"longitude","index$":3}},"id":{"field":"id","name":"id","parts":["lat","lon"],"sep":"/"},"name":"elevation","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /elevation","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"[[46.24566,6.17081],[46.85499,6.78134]]","k":"query","n":"pts","or":"pts","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/elevation","q":{"exist":["pts"]},"r":{},"s":[{"lit":"elevation"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /elevation/{lat}/{lon}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":46.24566,"k":"param","n":"lat","or":"lat","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"ex":6.17081,"k":"param","n":"lon","or":"lon","r":true,"t":"`$NUMBER`","index$":1}],"query":[{"a":true,"k":"query","n":"json","or":"json","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/elevation/{lat}/{lon}","q":{"exist":["json","lat","lon"]},"r":{},"s":[{"lit":"elevation"},{"var":"lat"},{"var":"lon"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"elevation","name__orig":"elevation","Name":"Elevation","name_":"elevation","name-":"elevation","NAME":"ELEVATION","index$":0}, {"active":true,"entity":"elevation","key$":"BasicElevationFlow","kind":"basic","name":"BasicElevationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"elevation_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"elevation_ref01","srcdatavar":"elevation_ref01_data","suffix":"_dt0"},"m":{"id":"elevation01","lat":"lat01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-elevation_ref01"}}],"index$":1}]}, 'Elevation', {"GET /elevation":{"protocol":"http","operationId":"getMultipleElevations","responses":{"200":{"description":"Successful response with elevation data for all provided coordinates","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"latitude":{"type":"number","description":"Latitude of the point","key$":"latitude"},"longitude":{"type":"number","description":"Longitude of the point","key$":"longitude"},"elevation":{"type":"number","nullable":true,"description":"Elevation in meters, or null if not available","key$":"elevation"}},"index$":0}}}}},"400":{"description":"Invalid request parameters"},"429":{"description":"Rate limit exceeded (10 requests per second limit on free plan)"}},"parameters":[{"name":"pts","in":"query","description":"Array of coordinate pairs in format [[lat1,lon1],[lat2,lon2],[lat3,lon3]]. Coordinates use WGS-84 datum.","required":true,"schema":{"type":"string"},"example":"[[46.24566,6.17081],[46.85499,6.78134]]","index$":0}],"securitySource":"unspecified"},"GET /elevation/{lat}/{lon}":{"protocol":"http","operationId":"getSingleElevation","responses":{"200":{"description":"Successful response with elevation data","content":{"text/plain":{"schema":{"type":"string","example":"42"},"example":"42"},"application/json":{"schema":{"type":"object","properties":{"elevation":{"type":"number","description":"Elevation in meters","key$":"elevation"}},"index$":0},"example":{"elevation":42}}}},"429":{"description":"Rate limit exceeded (10 requests per second limit on free plan)"},"501":{"description":"Point is not in the DEM dataset","content":{"text/plain":{"schema":{"type":"string"}},"application/json":{"schema":{"type":"object","properties":{"elevation":{"type":"null"}}}}}}},"parameters":[{"name":"lat","in":"path","description":"Latitude of the location (WGS-84)","required":true,"schema":{"type":"number","format":"double","minimum":-90,"maximum":90},"example":46.24566,"index$":0},{"name":"lon","in":"path","description":"Longitude of the location (WGS-84)","required":true,"schema":{"type":"number","format":"double","minimum":-180,"maximum":180},"example":6.17081,"index$":1},{"name":"json","in":"query","description":"Append this parameter to have the result returned as JSON format","required":false,"schema":{"type":"boolean"},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let elevation_ref01_data = Object.values(setup.data.existing.elevation)[0] as any

    // LIST
    const elevation_ref01_ent = client.Elevation()
    const elevation_ref01_match: any = {}

    const elevation_ref01_list = (await elevation_ref01_ent.list(elevation_ref01_match)).map((e: any) => e.data())


    // LOAD
    const elevation_ref01_match_dt0: any = {}
    elevation_ref01_match_dt0.id = elevation_ref01_data.id
    const elevation_ref01_data_dt0 = (await elevation_ref01_ent.load(elevation_ref01_match_dt0)).data()
    assert(elevation_ref01_data_dt0.id === elevation_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/elevation/ElevationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FreeElevationSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['elevation01','elevation02','elevation03','lat01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_ELEVATION_TEST_ELEVATION_ENTID': idmap,
    'FREE_ELEVATION_TEST_LIVE': 'FALSE',
    'FREE_ELEVATION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FREE_ELEVATION_TEST_ELEVATION_ENTID']

  const live = 'TRUE' === env.FREE_ELEVATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_ELEVATION_TEST_ELEVATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FreeElevationSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FREE_ELEVATION_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
