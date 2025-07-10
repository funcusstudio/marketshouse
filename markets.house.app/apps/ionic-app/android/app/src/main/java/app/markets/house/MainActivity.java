package app.markets.house;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import java.util.List;

//import app.markets.house.mydssplugin.MyDssPlugin;

public class MainActivity extends BridgeActivity {

//    static CKey CKey = null;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        registerPlugin(ExamplePlugin.class);
//        registerPlugin(MyDssPlugin.class);
//        Configuration config = new Configuration(
//                Configuration.RootCertificateType.Production,
//                Configuration.LOG_INFO,
//                Passphrase.threeword);ф
//
//        ru.stcrypt.ckey.sdk.v1.CKey.init(getApplicationContext(),
//                config,
//                new InitCallback() {
//                    @Override
//                    public void error(@NonNull Error Error) {
//                        // Инициализация прошла неудачно. Библиотекой пользоваться нельзя
//                        Log.e("ERROR", Error.getMessage());
//                    }
//
//                    @Override
//                    public void success(@NonNull CKey myInstance) {
//                        // Библиотека инициализирована успешно
//                        // Необходимо сохранить созданный экземпляр myInstance для дальнейшего использования
//                        CKey = myInstance;
//                    }
//
//                    @Override
//                    public void onCustomizationReady() {
//                        // Инициализация ещё не завершена, но уже доступно управление внешним видом SDK
//                        Appearance appearance = CKey.getAppearance();
//                        // Далее, кастомизация через appearance
//                        LayoutMapper layoutMapper = CKey.getLayoutsMapper();
//                        // Далее, кастомизация через layoutMapper
//                    }
//                });
    }
}