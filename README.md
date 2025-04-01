# Azure App Service CORS 설정 방법

Azure Portal에서 배포한 앱에 CORS (Cross-Origin Resource Sharing) 문제를 해결하려면 아래 단계를 따라 설정하세요.

## � 1. Azure Portal 접속
- **Azure Portal** ([https://portal.azure.com](https://portal.azure.com))에 로그인합니다.
- **App Services**로 이동하여 배포한 앱(예: `codepush-<yourapp-suffix>`)을 선택합니다.

## ⚙️ 2. CORS 설정 페이지 이동
- 좌측 메뉴에서 **API** 섹션을 찾습니다.
- **CORS (Cross-Origin Resource Sharing)** 항목을 클릭합니다.

## 3. 허용할 원본 입력
- `허용된 원본 (Allowed Origins)` 입력란에 CORS를 허용할 도메인을 추가합니다.
  - ✅ 예: `http://localhost:3000` (로컬 개발 환경에서 접근 허용)
  - ✅ 또는 `https://yourdomain.com` (실제 서비스 도메인)
- 여러 개의 도메인을 허용하려면 각 줄에 하나씩 입력합니다.
- ❗ 모든 도메인을 허용하려면 `*` (별표)를 입력할 수도 있지만, 보안상 권장되지 않습니다.

## 4. 변경 사항 저장 및 앱 재시작
- 입력을 완료한 후 **저장 (Save)** 버튼을 클릭합니다.
- 변경 사항이 적용되지 않을 경우, **App Service를 다시 시작 (Restart)** 합니다.
  - ▶️ 좌측 메뉴에서 **개요 (Overview)** 를 클릭한 후 **재시작 (Restart)** 버튼을 누릅니다.
- ⏳ 설정이 서버에 적용되는 데 **약 1분 정도 소요**될 수 있으므로 잠시 기다린 후 테스트를 진행합니다.

## ✅ 5. 확인 및 테스트
- 로컬 또는 배포된 프론트엔드에서 API 요청을 실행하여 CORS 오류가 발생하지 않는지 확인합니다.
- �️ 브라우저 개발자 도구(F12) > **콘솔(Console)** 및 **네트워크(Network)** 탭에서 요청 응답을 확인하세요.

� 이제 Azure App Service에서 CORS가 정상적으로 설정되었습니다!