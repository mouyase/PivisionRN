package tech.yojigen.pivision.rn;

import android.app.Activity;
import android.content.Context;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Build;
import android.util.DisplayMetrics;
import android.view.Display;
import android.view.Window;
import android.view.WindowManager;

import java.lang.reflect.Method;

public class DisplayUtils {
    /* 获取系统默认缩放设置 */
    public static Context getConfigurationContext(Context context) {
        Configuration configuration = context.getResources().getConfiguration();
        int screenWidth  = context.getResources().getDisplayMetrics().widthPixels;
        int dpi= (int) (screenWidth/2.4f);
        /* 设置为系统默认DPI */
        configuration.densityDpi = dpi;
        /* 设置为系统默认字体大小 */
        configuration.fontScale = 1;
        return context.createConfigurationContext(configuration);
    }
}
