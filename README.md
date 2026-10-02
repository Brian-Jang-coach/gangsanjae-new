# 강산재 | KANGSANJAE

GitHub 업로드 및 Vercel 배포용 Next.js 프로젝트입니다. 한·영 26개 페이지, 실제 사진 6장, 갤러리, 모바일 메뉴, 문의 데모와 SEO 설정이 포함됩니다.

## 1. ZIP 압축 풀기

압축을 풀면 `kangsanjae/` 폴더가 나옵니다. **이 폴더 안의 파일과 폴더를 GitHub 저장소 최상위에 올리세요.** GitHub는 ZIP 안의 소스를 자동으로 풀어주지 않습니다. 저장소 최상위에서 `package.json`, `src/`, `public/`, `pnpm-lock.yaml`이 보여야 합니다. 숨김 파일 `.gitignore`, `.env.example`도 포함해 주세요.

Git으로 올리는 경우:

```sh
cd kangsanjae
git init
git add .
git commit -m "Initial Kangsanjae website"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin main
```

`YOUR_ACCOUNT`, `YOUR_REPOSITORY`를 실제 계정과 저장소 이름으로 바꾸세요. 로그인·업로드·배포는 이 ZIP을 통해 자동 실행되지 않습니다.

## 2. Vercel에 연결

1. Vercel에 로그인하고 Add New → Project에서 GitHub 저장소를 가져옵니다.
2. Framework Preset은 Next.js, Node.js는 24.x를 사용합니다.
3. 저장소 최상위에 프로젝트 파일을 올렸다면 Root Directory는 기본값을 유지합니다. 저장소 안에 `kangsanjae/` 폴더째 올렸다면 Root Directory를 `kangsanjae`로 지정합니다.
4. 설치·빌드 명령은 `vercel.json`에 설정되어 있습니다. Output Directory는 별도로 지정하지 마세요.
5. Environment Variables에 `NEXT_PUBLIC_SITE_URL`을 추가하고 실제 `https://...vercel.app` 주소 또는 연결할 도메인을 입력합니다. 아직 주소를 모르면 최초 배포 후 발급된 주소를 넣고 **Redeploy**하세요. Production 및 필요하면 Preview에도 설정합니다.
6. Deploy를 누르고 완료 후 `/ko`, `/en`, `/ko/stay`, `/ko/contact`, `/sitemap.xml`을 확인합니다.

`SITE_STATIC_EXPORT`는 이 패키지에 필요하지 않습니다. Sites 전용 설정과 Git 기록은 제외했습니다. Vercel에서는 Next.js의 이미지 최적화가 사용됩니다.

## 3. 내 PC에서 실행

Node.js 24.x를 설치하고 프로젝트 폴더에서 실행합니다:

```sh
npx --yes pnpm@11.19.0 install --frozen-lockfile
npx --yes pnpm@11.19.0 run dev
```

한국어: http://127.0.0.1:3000/ko
영어: http://127.0.0.1:3000/en

```sh
npx --yes pnpm@11.19.0 run lint
npx --yes pnpm@11.19.0 run typecheck
npx --yes pnpm@11.19.0 run build
npx --yes pnpm@11.19.0 run start
```

## 4. 파일 구성

- `src/config/site.ts`: 주소·예약 링크·연락처·객실 정보·확인 상태·사진.
- `src/content/locales.ts`: 한국어·영어 콘텐츠, 폼 라벨·오류 문구.
- `src/components/`: 공통 섹션·페이지 및 모바일 메뉴·갤러리·문의 UI.
- `src/app/`: 라우트, 스타일, 메타데이터, sitemap·robots.
- `public/images/`: 실제 웹 사진 6장. `public/`: 파비콘과 llms.txt.
- `references/`: 한국어·영어 목업 원본.
- `Concept.md`, `Design.md`, `ToDo.md`: 기획·디자인·구현 기록.
- `docs/`: 작업 보고, 로컬 검수 결과 및 화면 이미지.
- `pnpm-lock.yaml`: 검수에 사용한 패키지 버전 잠금. 함께 업로드하세요.

## 5. 실제 운영 전에 입력할 정보

예약 링크·전화·이메일·카카오톡·SNS는 `src/config/site.ts`에서 채웁니다. 객실명·인원·시설·독채 조건·요금·체크인/아웃·정책·사업자 정보는 운영자 확인이 필요합니다. 본채/별채는 공간 미리보기의 임시 편집 명칭입니다.

문의 양식은 입력 검증만 하며 **전송하거나 저장하지 않는 데모**입니다. 실제 접수를 위해서는 백엔드와 확정 개인정보 정책을 연결해야 합니다. 실제 후기와 제공되지 않은 실내·계절 사진은 준비 상태로 표시됩니다.

이 ZIP은 업로드용 정리본이며 GitHub 업로드 또는 Vercel 배포 완료를 의미하지 않습니다. 기존 Sites 공개 홈페이지는 변경하지 않았습니다.

## 공식 참고

- [Vercel Node.js 버전](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
- [Vercel 패키지 관리자](https://vercel.com/docs/package-managers)
