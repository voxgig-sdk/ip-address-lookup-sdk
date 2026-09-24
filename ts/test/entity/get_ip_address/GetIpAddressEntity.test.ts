

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"asn":{"a":true,"h":"Asn","n":"asn","r":false,"sh":"Autonomous System Number","t":"`$STRING`","key$":"asn","index$":0},"isp":{"a":true,"h":"Isp","n":"isp","r":false,"sh":"Internet Service Provider","t":"`$STRING`","key$":"isp","index$":1},"organization":{"a":true,"h":"Organization","n":"organization","r":false,"sh":"Organization owning the IP range","t":"`$STRING`","key$":"organization","index$":2}},"name":"get_ip_address","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/","q":{},"r":{},"s":[],"t":{"req":"`reqdata`","res":"`body.network`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_ip_address","name__orig":"get_ip_address","Name":"GetIpAddress","name_":"get_ip_address","name-":"get-ip-address","NAME":"GET_IP_ADDRESS","index$":0}, {"active":true,"entity":"get_ip_address","key$":"BasicGetIpAddressFlow","kind":"basic","name":"BasicGetIpAddressFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"get_ip_address_ref01","srcdatavar":"get_ip_address_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_ip_address_ref01"}}],"index$":0}]}, 'GetIpAddress', {"GET /":{"protocol":"http","operationId":"getIpAddress","responses":{"200":{"description":"Successful response with IP address and network information","content":{"application/json":{"schema":{"type":"object","properties":{"ip":{"description":"The public IP address of the client","example":"203.0.113.42","key$":"ip","type":"string"},"network":{"description":"Network information associated with the IP address","key$":"network","properties":{"asn":{"description":"Autonomous System Number","example":"AS15169","type":"string","key$":"asn"},"isp":{"description":"Internet Service Provider","example":"Google Cloud","type":"string","key$":"isp"},"organization":{"description":"Organization owning the IP range","example":"Google LLC","type":"string","key$":"organization"}},"type":"object","index$":0}}},"examples":{"example1":{"summary":"Example IP lookup response","value":{"ip":"203.0.113.42","network":{"asn":"AS15169","organization":"Google LLC","isp":"Google Cloud"}}}}},"text/plain":{"schema":{"type":"string","example":"203.0.113.42"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Unable to determine IP address"}}}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
