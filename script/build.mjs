#!/usr/bin/env zx
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import { copy } from 'fs-extra'
import { $, cd, echo } from 'zx'

echo('building web...')
await $`pnpm vite build`
echo('building server...')
cd('server')
await $`pnpm vite build`
cd('..')
echo('copy')
await copy('server/dist/main.js', 'dist/preload.js')
echo('finish')
