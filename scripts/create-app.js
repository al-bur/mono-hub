const prompts = require('prompts');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function main() {
  const response = await prompts([
    {
      type: 'text',
      name: 'name',
      message: '앱 이름을 입력하세요:',
      validate: value => value.length > 0 || '이름은 필수입니다'
    },
    {
      type: 'select',
      name: 'template',
      message: '템플릿을 선택하세요:',
      choices: [
        { title: 'Next.js (Pages Router)', value: 'next-pages' },
        { title: 'Next.js (App Router)', value: 'next-app' },
        { title: 'Vite + React', value: 'vite-react' }
      ]
    }
  ]);

  if (!response.name || !response.template) {
    console.log('❌ 취소되었습니다');
    return;
  }

  const appDir = path.join(process.cwd(), 'apps', response.name);

  // 기본 템플릿 복사
  await fs.copy(
    path.join(process.cwd(), 'templates', response.template),
    appDir
  );

  // package.json 수정
  const packageJson = await fs.readJson(path.join(appDir, 'package.json'));
  packageJson.name = `@${response.name}/web`;
  await fs.writeJson(path.join(appDir, 'package.json'), packageJson, { spaces: 2 });

  // 의존성 설치
  console.log('📦 의존성 설치 중...');
  execSync('bun install', { stdio: 'inherit' });

  console.log(`
✅ ${response.name} 앱이 생성되었습니다!

시작하기:
  cd apps/${response.name}
  bun run dev
  `);
}

main().catch(console.error); 