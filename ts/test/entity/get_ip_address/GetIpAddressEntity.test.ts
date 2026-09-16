

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IpAddressLookupSDK, BaseFeature, stdutil } from '../../..'

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetIpAddressEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IP_ADDRESS_LOOKUP_TEST_LIVE=TRUE.
  afterEach(liveDelay('IP_ADDRESS_LOOKUP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpAddressLookupSDK.test()
    const ent = testsdk.GetIpAddress()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IP_ADDRESS_LOOKUP_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_ip_address.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"asn","req":false,"short":"Autonomous System Number","type":"`$STRING`","index$":0},{"active":true,"name":"isp","req":false,"short":"Internet Service Provider","type":"`$STRING`","index$":1},{"active":true,"name":"organization","req":false,"short":"Organization owning the IP range","type":"`$STRING`","index$":2}],"name":"get_ip_address","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /","json":"{\"operationId\":\"getIpAddress\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"example1\":{\"summary\":\"Example IP lookup response\",\"value\":{\"ip\":\"203.0.113.42\",\"network\":{\"asn\":\"AS15169\",\"isp\":\"Google Cloud\",\"organization\":\"Google LLC\"}}}},\"schema\":{\"properties\":{\"ip\":{\"description\":\"The public IP address of the client\",\"example\":\"203.0.113.42\",\"type\":\"string\"},\"network\":{\"description\":\"Network information associated with the IP address\",\"properties\":{\"asn\":{\"description\":\"Autonomous System Number\",\"example\":\"AS15169\",\"type\":\"string\"},\"isp\":{\"description\":\"Internet Service Provider\",\"example\":\"Google Cloud\",\"type\":\"string\"},\"organization\":{\"description\":\"Organization owning the IP range\",\"example\":\"Google LLC\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}},\"text/plain\":{\"schema\":{\"example\":\"203.0.113.42\",\"type\":\"string\"}}},\"description\":\"Successful response with IP address and network information\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Unable to determine IP address\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/","segments":[],"select":{},"transform":{"req":"`reqdata`","res":"`body.network`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_ip_address","name__orig":"get_ip_address","Name":"GetIpAddress","name_":"get_ip_address","name-":"get-ip-address","NAME":"GET_IP_ADDRESS","index$":0}, {"active":true,"entity":"get_ip_address","key$":"BasicGetIpAddressFlow","kind":"basic","name":"BasicGetIpAddressFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"get_ip_address_ref01","srcdatavar":"get_ip_address_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_ip_address_ref01"}}],"index$":0}]}, 'GetIpAddress')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_ip_address_ref01_data = Object.values(setup.data.existing.get_ip_address)[0] as any

    // LOAD
    const get_ip_address_ref01_ent = client.GetIpAddress()
    const get_ip_address_ref01_match_dt0: any = {}
    const get_ip_address_ref01_data_dt0 = (await get_ip_address_ref01_ent.load(get_ip_address_ref01_match_dt0)).data()
    assert(null != get_ip_address_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_ip_address/GetIpAddressTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IpAddressLookupSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_ip_address01','get_ip_address02','get_ip_address03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IP_ADDRESS_LOOKUP_TEST_GET_IP_ADDRESS_ENTID': idmap,
    'IP_ADDRESS_LOOKUP_TEST_LIVE': 'FALSE',
    'IP_ADDRESS_LOOKUP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IP_ADDRESS_LOOKUP_TEST_GET_IP_ADDRESS_ENTID']

  const live = 'TRUE' === env.IP_ADDRESS_LOOKUP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IP_ADDRESS_LOOKUP_TEST_GET_IP_ADDRESS_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IpAddressLookupSDK(merge([
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
    explain: 'TRUE' === env.IP_ADDRESS_LOOKUP_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
