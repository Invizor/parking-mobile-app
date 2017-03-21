/**
 */
package com.wellseek.cordova;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.graphics.Color;
import android.graphics.Paint;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.NumberPicker;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import static com.wellseek.cordova.SelectorCordovaPlugin.SELECTOR_THEME;
import static com.wellseek.cordova.SelectorCordovaPlugin.setNumberPickerTextColor;

public class SelectorCordovaPlugin extends CordovaPlugin {
    public static final String TAG = "SelectorCordovaPlugin";
    public static final String BLANK_STRING = "";
    public static final String SPACE = " ";
    public static final int WIDTH = 50;
    public static final int HEIGHT = 50;

    public static boolean WHEEL_WRAP;
    public static final String LIGHT_THEME = "light";
    public static final String DARK_THEME = "dark";
    public static SelectorTheme SELECTOR_THEME = null;

    private static final String INDEX_KEY = "index";
    private static final String DISPLAY_ITEMS_KEY = "displayItems";
    private static final String DISPLAY_KEY = "displayKey";
    private static final String TITLE_KEY = "title";
    private static final String POSITIVE_BUTTON_TEXT_KEY = "positiveButtonText";
    private static final String NEGATIVE_BUTTON_TEXT_KEY = "negativeButtonText";
    private static final String WRAP_WHEEL_TEXT_KEY = "wrapWheelText";
    private static final String THEME_KEY = "theme";

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    public boolean execute(final String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {

        final CordovaInterface cordova = this.cordova; 

        if (action.equals("showSelector")) {

            final JSONObject options = args.getJSONObject(0);

            String config = args.getString(0);
            final JSONArray items = options.getJSONArray(DISPLAY_ITEMS_KEY);
            final String displayKey = options.getString(DISPLAY_KEY);
            final String title = options.getString(TITLE_KEY);
            final String positiveButton = options.getString(POSITIVE_BUTTON_TEXT_KEY);
            final String negativeButton = options.getString(NEGATIVE_BUTTON_TEXT_KEY);
            final String wrapSelectorText = options.getString(WRAP_WHEEL_TEXT_KEY);
            final String theme = options.getString(THEME_KEY);

            WHEEL_WRAP = Boolean.parseBoolean(wrapSelectorText);
            SELECTOR_THEME = new SelectorTheme(theme);

            Log.d(TAG, "Config options: " + config);

            Runnable runnable = new Runnable() {
                public void run() {

                    AlertDialog.Builder builder = new AlertDialog.Builder(cordova.getActivity(), SELECTOR_THEME.getAlertBuilderTheme());
                    builder.setTitle(title);
                    builder.setCancelable(true);
                    List<PickerView> views = null;
                    try {

                        views = getPickerViews(cordova.getActivity(), items);
                    } catch (JSONException je) {
                        Log.v(TAG, "Exception: " + je.getMessage());
                    }

                    final List<PickerView> asFinal = views;
                    LinearLayout layout = new LinearLayout(cordova.getActivity());
                    layout.setOrientation(LinearLayout.HORIZONTAL);

                    LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(WIDTH, HEIGHT);
                    params.gravity = Gravity.CENTER;
                    layout.setLayoutParams(params);

                    if (views != null) {
                        for (int i = 0; i < views.size(); ++i) {

                            layout.addView(views.get(i).getNumberPicker(), views.get(i).getLayoutParams());
                        }
                    } else {
                        Log.d(TAG, "error, views is null");
                    }

                    builder
                            .setCancelable(false)
                            .setPositiveButton(positiveButton,
                                    new DialogInterface.OnClickListener() {
                                        public void onClick(DialogInterface dialog,
                                                            int id) {
                                            JSONArray selectedValues = new JSONArray();

                                            JSONObject jsonValue = null;
                                            try {

                                                String value;
                                                for (int i = 0; i < asFinal.size(); ++i) {
                                                    jsonValue = new JSONObject();

                                                    value = asFinal.get(i).getDataToShow(asFinal.get(i).getNumberPicker().getValue());
                                                    jsonValue.put(INDEX_KEY, asFinal.get(i).getNumberPicker().getValue());

                                                    if (value != null && value.equalsIgnoreCase(SPACE))
                                                        jsonValue.put(displayKey, BLANK_STRING);
                                                    else
                                                        jsonValue.put(displayKey, value);

                                                    selectedValues.put(jsonValue);
                                                }
                                            } catch (JSONException je) {

                                            }

                                            final PluginResult resultToReturnToJS = new PluginResult(PluginResult.Status.OK, (selectedValues));
                                            callbackContext.sendPluginResult(resultToReturnToJS);
                                            dialog.dismiss();

                                        }
                                    })
                            .setNegativeButton(negativeButton,
                                    new DialogInterface.OnClickListener() {
                                        public void onClick(DialogInterface dialog,
                                                            int id) {
                                            Log.d(TAG, "User canceled");
                                             callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR));
                                            dialog.cancel();
                                        }
                                    });

                    builder.setView(layout);

                    AlertDialog alert = builder.create();

                    alert.getWindow().getAttributes().windowAnimations = android.R.style.Animation_Dialog;
                    alert.show();
                }
            };

            this.cordova.getActivity().runOnUiThread(runnable);
        }

        return true;
    }

    public static List<PickerView> getPickerViews(Activity activity, JSONArray items) throws JSONException {

        List<PickerView> views = new ArrayList<PickerView>();
        for (int i = 0; i < items.length(); ++i) {
            views.add(new PickerView(activity, items.getJSONArray(i)));
        }
        return views;
    }

    public static String[] toStringArray(JSONArray array) {
        if (array == null)
            return null;

        String[] arr = new String[array.length()];
        for (int i = 0; i < arr.length; i++) {
            if (array.optString(i) != null && array.optString(i).equalsIgnoreCase(BLANK_STRING))
                arr[i] = SPACE;
            else
                arr[i] = array.optString(i);
        }
        return arr;
    }

    public static boolean setNumberPickerTextColor(NumberPicker numberPicker, int color) {

        final int count = numberPicker.getChildCount();
        for (int i = 0; i < count; i++) {
            View child = numberPicker.getChildAt(i);
            if (child instanceof EditText) {
                try {
                    Field selectorWheelPaintField = numberPicker.getClass()
                            .getDeclaredField("mSelectorWheelPaint");
                    selectorWheelPaintField.setAccessible(true);
                    ((Paint) selectorWheelPaintField.get(numberPicker)).setColor(color);

                    //paint.TextSize =  TypedValue.ApplyDimension(complexUnitType, textSize, numberPicker.Resources.DisplayMetrics);

                    //will bold the selection
//                    ((Paint) selectorWheelPaintField.get(numberPicker)).setTypeface(Typeface.DEFAULT_BOLD);

                    ((EditText) child).setTextColor(color);
                    numberPicker.invalidate();
                    return true;
                } catch (NoSuchFieldException e) {
                    System.out.println("setNumberPickerTextColor");
                } catch (IllegalAccessException e) {
                    System.out.println("setNumberPickerTextColor");
                } catch (IllegalArgumentException e) {
                    System.out.println("setNumberPickerTextColor");
                }
            }
        }
        return false;
    }
}


class PickerView {
    private String[] dataToShow;
    private Activity activity;
    private NumberPicker picker;

    private LinearLayout.LayoutParams numPicerParams;

    public PickerView(Activity activity, JSONArray args) {
        dataToShow = SelectorCordovaPlugin.toStringArray(args);
        this.activity = activity;
    }

    public NumberPicker getNumberPicker() {

        //ContextThemeWrapper cw = new ContextThemeWrapper(activity,  android.R.style.Holo_ButtonBar_AlertDialog);
//        ContextThemeWrapper cw = new ContextThemeWrapper(activity,  android.R.style.Theme_Black_NoTitleBar_Fullscreen);

        if (picker == null) {
            //picker = new NumberPicker(cw);
            picker = new NumberPicker(activity);
            picker.setMinValue(0);
            picker.setMaxValue(dataToShow.length - 1);

            picker.setDisplayedValues(dataToShow);
            picker.setWrapSelectorWheel(SelectorCordovaPlugin.WHEEL_WRAP);
            picker.setFocusable(false);

            picker.setFocusableInTouchMode(true);

            setNumberPickerTextColor(picker, SELECTOR_THEME.getNumberPickerTextColor());
        }

        return picker;
    }


    public LinearLayout.LayoutParams getLayoutParams() {
        if (numPicerParams == null) {
            numPicerParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
            numPicerParams.weight = 1;
        }
        return numPicerParams;
    }

    public String getDataToShow(int index) {
        return dataToShow[index];
    }
}


class SelectorTheme {
    private String themeColors;

    public SelectorTheme(String theme) {
        themeColors = theme;
    }

    public int getNumberPickerTextColor() {
        if (themeColors.equalsIgnoreCase(SelectorCordovaPlugin.LIGHT_THEME)) {
            return Color.BLACK;
        }

        return Color.WHITE;
    }

    public int getAlertBuilderTheme() {
        if (themeColors.equalsIgnoreCase(SelectorCordovaPlugin.LIGHT_THEME)) {
            return android.R.style.Theme_DeviceDefault_Light_Dialog_Alert;
        }

        return android.R.style.Theme_DeviceDefault_Dialog_Alert;
    }
}





